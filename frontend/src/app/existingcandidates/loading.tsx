"use client";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function SpinnerLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(57, 14, 59, 0.2)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
