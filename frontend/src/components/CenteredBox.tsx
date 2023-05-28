import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function CenteredBox({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 1,
      }}
    >
      {children}
    </Box>
  );
}
