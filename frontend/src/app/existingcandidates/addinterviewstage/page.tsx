"use client";

import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { newInterviewStageValidation } from "@/validations/newInterviewStageValidation";
import CenteredBox from "@/components/CenteredBox";
import { post } from "@/lib/fetchWrapper";
import Link from "next/link";
import AlertComponent from "@/components/AlertComponent";

export default function AddInterviewStageForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [candidateData, setCandidateData] = useState({} as any);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [errorMessageOpen, setErrorMessageOpen] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent<any> | Event,
    reason: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessMessageOpen(false);
    setErrorMessageOpen(false);
  };

  useEffect(() => {
    post("http://localhost:6001/interviewdata", { id: id }).then((res) => {
      setCandidateData(res);
    });
  }, [id, setCandidateData]);

  const formik = useFormik({
    initialValues: {
      id: id,
      name: "",
      role: "",
      cv: "",
      result: "Pending",
      interviewer: "",
      feedback: "",
      date_time: "",
      stage: 0,
    },
    validationSchema: newInterviewStageValidation,

    onSubmit: (values) => {
      try {
        post("http://localhost:6001/addinterview", values).then((res) => {
          if (res.status === 200) {
            setSuccessMessageOpen(true);
          } else {
            setErrorMessageOpen(true);
          }
        });
      } catch (err) {
        setErrorMessageOpen(true);
        console.log(err);
      }
    },
  });

  return (
    <>
      <CenteredBox>
        <h2>Add a new interview stage information here</h2>
        <Box
          component="form"
          method="post"
          sx={{
            mt: 1,
            maxWidth: { sm: "70%", md: "40%", lg: "40%", xl: "30%" },
          }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            margin="normal"
            fullWidth
            value={
              (formik.values.stage = candidateData.Interviews
                ? candidateData.Interviews[0].interview_stage + 1
                : 0)
            }
            name="stage"
            label="Interview Stage"
          />
          <TextField
            margin="normal"
            fullWidth
            name="name"
            value={
              (formik.values.name = candidateData.name
                ? candidateData.name
                : "")
            }
            label="Candidate Name"
          />
          <TextField
            margin="normal"
            fullWidth
            name="role"
            value={
              (formik.values.role = candidateData.role
                ? candidateData.role
                : "")
            }
            label="Applied Role"
          />
          <TextField
            margin="normal"
            fullWidth
            name="cv"
            value={
              (formik.values.cv = candidateData.cv_url
                ? candidateData.cv_url
                : "")
            }
            label="CV URL"
          />
          <hr />
          <FormHelperText>
            Add the information below for form submission:
          </FormHelperText>
          <hr />
          <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
            <InputLabel id="interview-result-select-label">
              Interview Result
            </InputLabel>
            <Select
              labelId="interview-result-select-label"
              id="interview-result-select"
              label={"Interview Result"}
              name={"result"}
              value={formik.values.result}
              onChange={formik.handleChange}
            >
              <MenuItem value={"Passed"}>Passed</MenuItem>
              <MenuItem value={"Failed"}>Failed</MenuItem>
              <MenuItem value={"Pending"}>Pending</MenuItem>
            </Select>
            <FormHelperText>
              For updating interview information at a later time, choose
              &quot;Pending&quot;
            </FormHelperText>
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            name="interviewer"
            variant="filled"
            label="Interviewer Name"
            id="interviewer"
            value={formik.values.interviewer}
            onChange={formik.handleChange}
            error={
              formik.touched.interviewer && Boolean(formik.errors.interviewer)
            }
            helperText={formik.touched.interviewer && formik.errors.interviewer}
            autoComplete="name"
          />
          <TextField
            margin="normal"
            fullWidth
            name="feedback"
            variant="filled"
            label="Interview Feedback"
            id="interview-feedback"
            value={formik.values.feedback}
            onChange={formik.handleChange}
            multiline
          />
          <FormHelperText>
            For separate feedback points, enter a newline
          </FormHelperText>
          <TextField
            margin="normal"
            fullWidth
            name="date_time"
            variant="filled"
            label="Date & Time of Interview"
            id="date-time"
            value={formik.values.date_time}
            onChange={formik.handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 5, py: 1, bgcolor: "rgb(57,14,59)" }}
          >
            Submit Information
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: { xs: "90%", md: "40%" },
            mt: 2,
          }}
        >
          <Link href={"/"}>Go back to the main page</Link>
          <Link href={"/existingcandidates"}>
            Go back to the list of candidates
          </Link>
        </Box>
      </CenteredBox>

      <AlertComponent
        open={successMessageOpen}
        handleClose={handleClose}
        severity="success"
        alertTitle="Success"
        alertMessage="New interview information has been updated successfully!"
      />
      <AlertComponent
        open={errorMessageOpen}
        handleClose={handleClose}
        severity="warning"
        alertTitle="Error"
        alertMessage="An unexpected error has occurred. Please try again later."
      />
    </>
  );
}
