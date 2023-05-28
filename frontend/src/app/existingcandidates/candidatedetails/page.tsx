"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { post } from "@/lib/fetchWrapper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Box } from "@mui/material";

export default function CandidatePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [candidateData, setCandidateData] = useState([] as any);
  const [lastInterviewResult, setLastInterviewResult] = useState("");
  useEffect(() => {
    post("http://localhost:6001/candidatedetails", { id: id }).then((res) => {
      setCandidateData(res);
      setLastInterviewResult(
        res.Interviews[res.Interviews.length - 1].interview_result
      );
    });
  }, [setCandidateData, id, setLastInterviewResult]);

  return (
    <>
      <Typography variant="h4" sx={{ ml: 5, mt: 1, mb: 3 }}>
        Candidate Details
      </Typography>
      <Card
        sx={{ maxWidth: "40%", mb: 2, ml: 5, bgcolor: "rgba(57, 14, 59, 0.1)" }}
        variant="outlined"
        key={candidateData.id}
      >
        <CardContent sx={{ py: 3 }}>
          <Typography variant="h5" component="div">
            {candidateData.name}
          </Typography>
          <Typography color="text.secondary">
            Applied Role: {candidateData.role}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            CV URL: <u>{candidateData.cv_url}</u>
          </Typography>
          {candidateData.Interviews
            ? candidateData.Interviews.map((interview) => {
                const feedbacks = interview.interview_feedback.split("\n");
                return (
                  <div key={interview.interview_stage}>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      <b>Interview Stage:</b> {interview.interview_stage} <br />
                      <b>Result:</b> {interview.interview_result} <br />
                      <b>Interviewer:</b> {interview.interviewer} <br />
                      <b>Feedbacks:</b>
                      <br />{" "}
                      {feedbacks.map((feedback: string) => (
                        <>
                          • {feedback} <br />
                        </>
                      ))}{" "}
                      <b>Date & Time:</b> {interview.interview_date_time}
                    </Typography>
                    <hr />
                  </div>
                );
              })
            : null}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            onClick={() => console.log(candidateData)}
          >
            Edit Last Interview Information
          </Button>
          <Button
            size="small"
            variant="contained"
            disabled={lastInterviewResult === "Pending"}
          >
            Add New Interview Stage
          </Button>
        </CardActions>
      </Card>
      <Box sx={{ ml: 5, mb: 5 }}>
        <Link href={"/existingcandidates"}>
          Go back to the list of candidates
        </Link>
      </Box>
    </>
  );
}
