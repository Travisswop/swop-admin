import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import americanFlag from "@/public/images/american_flag.webp";
import bangladeshFlag from "@/public/images/bangladesh_flag.png";
import { FaAngleDown } from "react-icons/fa";

export default function LanguageMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [language, setLanguage] = React.useState<string>("eng");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (langProp: string) => {
    setAnchorEl(null);
    setLanguage(langProp);
  };

  return (
    <div className="">
      <button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="flex items-center gap-1.5"
      >
        <Image
          alt="user image"
          src={language === "eng" ? americanFlag : bangladeshFlag}
          className="w-[22px] h-[22px] rounded-full"
        />
        <p className="text-[#2D3032] font-medium text-lg ml-1">
          {language === "eng" ? "Eng (US)" : "Bangla"}
        </p>
        <FaAngleDown
          color="gray"
          className={`${
            open ? "rotate-180" : "rotate-0"
          } transition-transform duration-500`}
        />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose("eng")}>Eng (US)</MenuItem>
        <MenuItem onClick={() => handleClose("bangla")}>Bangla</MenuItem>
      </Menu>
    </div>
  );
}
