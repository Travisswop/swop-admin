import { Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <div>
      <Skeleton height={"120px"} animation={"wave"} />
      <Skeleton height={"120px"} animation={"wave"} />
      <Skeleton height={"120px"} animation={"wave"} />
      <Skeleton height={"120px"} animation={"wave"} />
    </div>
  );
}
