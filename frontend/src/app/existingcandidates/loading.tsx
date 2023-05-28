"use client";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function SpinnerLoading() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
      <p>Loading...</p>
    </Box>
  );
}
