
"use client";

import { getAllMicrosites } from "@/action/microsites";
import { Box, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import isUrl from "../util/isUrl";

interface Microsite {
  _id: string;
  name: string | null;
  email: string | null;
  bio: string | null;
  profilePic: string | null;
  parentId: {
    name: string | null;
    bio: string | null;
  } | null;
}

interface Props {
  token: string;
  setRedirectMicrosite: (id: string) => void;
  setMicrositeId: (id: string) => void;
  setMicrositeName: (name: string) => void;
  micrositeName: string;
}

const MIcrositeSearchInputField = ({ token,
  setRedirectMicrosite,
  setMicrositeId,
  setMicrositeName,
  micrositeName,}: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [microsites, setMicrosites] = useState<Microsite[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMicrosite, setSelectedMicrosite] = useState<Microsite | null>(
    null
  );

  const fetchMicrosites = useCallback(
    async (query: string) => {
      if (!query.trim()) return;
      setLoading(true);
      try {
        const res = await getAllMicrosites(token, query);
        setMicrosites(res?.data || []);
      } catch (err) {
        console.error("Fetch microsites error:", err);
        setMicrosites([]);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputValue) fetchMicrosites(inputValue);
    }, 500);
    return () => clearTimeout(timeout);
  }, [inputValue, fetchMicrosites]);

  const handleChange = (_event: SyntheticEvent, newValue: Microsite | null) => {
    setSelectedMicrosite(newValue);
    if (newValue?._id) {
      const name = newValue?.name || "";
      setMicrositeName(name);
      setRedirectMicrosite(newValue?.profileUrl || "");
      setMicrositeId(newValue._id);
    }
  };


  console.log("micrositeName", micrositeName);


  return (
    <Autocomplete
      sx={{ width: "100%", maxWidth: 510 }}
      size="medium"
      getOptionLabel={(option) => option.name || "Unnamed"}
      options={microsites}
      loading={loading}
      value={selectedMicrosite}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 1.5,
            borderBottom: "1px solid #eee",
          }}
        >
          <Image
            src={
              option?.profilePic && isUrl(option?.profilePic)
                ? option?.profilePic
                : option?.profilePic
                ? `/images/user_avator/${option?.profilePic}@3x.png`
                : "/images/user_avator/default@3x.png"
            }
            alt={option?.name || "User profile picture"}
            className="w-9 h-9 rounded-full"
            width={120}
            height={120}
          />
          <Box>
            <Typography fontWeight="bold">
              {option.name || "Unnamed"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {option.bio || "No bio"}
            </Typography>
          </Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search microsite..."
          sx={{
            "& .MuiOutlinedInput-root": {
              paddingY: "2px",
              paddingX: "16px",
              borderRadius: "0.5rem",
              fontSize: "1.125rem",
              borderColor: "#d1d5db",
              "&:hover": {
                borderColor: "#3b82f6",
              },
            },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default MIcrositeSearchInputField;
