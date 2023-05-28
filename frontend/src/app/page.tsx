"use client";
import { Box, Typography, Container, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ReusableMUIButton from "@/components/ReusableMUIButton";
import "./HomePage.css";

export default function Home() {
  const router = useRouter();
  return (
    <Container className={"homepage-wrapper-container"}>
      <div className={"padding-wrapper"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 5,
          }}
        >
          <Typography variant="h3">Recruitment Logger App</Typography>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Adding a new candidate information or updating the information of an
            existing candidate will send an update to the designated slack
            channel.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ReusableMUIButton
            buttonText={"Add a new candidate information"}
            onClickHandler={() => router.push("/newcandidate")}
          />
          <ReusableMUIButton
            buttonText={"Update the interview status of an existing candidate"}
            onClickHandler={() => router.push("/existingcandidates")}
          />
        </Box>
      </div>
    </Container>
  );
}
