"use client";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import CenteredBox from "@/components/CenteredBox";
import { get } from "@/lib/fetchWrapper";
import { Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ActiveCandidateList() {
  const [candidateData, setCandidateData] = useState([] as any);
  const router = useRouter();

  useEffect(() => {
    get("http://localhost:6001/activecandidates").then((res) => {
      setCandidateData(res);
    });
  }, [setCandidateData]);

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 1 }}>
        List of currently active candidates
      </Typography>
      <Box sx={{ ml: 5, my: 5 }}>
        <Link href={"/"}>Go back to the main page</Link>
      </Box>

      <CenteredBox>
        {candidateData.map((candidate: any) => {
          const interview_result = candidate.Interviews[0].interview_result;
          return (
            <Card
              sx={{ minWidth: "40%", mb: 2, bgcolor: "rgba(57, 14, 59, 0.1)" }}
              variant="outlined"
              key={candidate.id}
            >
              <CardContent
                onClick={() =>
                  router.push(
                    `/existingcandidates/candidatedetails?id=${candidate.id}`
                  )
                }
                sx={{ cursor: "pointer" }}
              >
                <Typography variant="h5" component="div">
                  {candidate.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Applied Role: {candidate.role}
                </Typography>
                <Typography variant="body2">
                  Last Interview Stage:{" "}
                  {candidate.Interviews[0].interview_stage}
                  <br />
                  Interview Result: {interview_result}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    router.push(
                      `/existingcandidates/updateinterview?id=${candidate.id}`
                    )
                  }
                >
                  Edit Last Interview Information
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  disabled={interview_result === "Pending"}
                  onClick={() =>
                    router.push(
                      `/existingcandidates/addinterviewstage?id=${candidate.id}`
                    )
                  }
                >
                  Add New Interview Stage
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </CenteredBox>
    </>
  );
}
