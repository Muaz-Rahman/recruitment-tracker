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
import { newCandidateFormSchema } from "@/validations/newCandidateFormValidation";
import { useFormik } from "formik";
import { useState } from "react";
import Link from "next/link";
import CenteredBox from "@/components/CenteredBox";
import AlertComponent from "@/components/AlertComponent";

export default function AddNewCandidate() {
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

  const formik = useFormik({
    initialValues: {
      name: "",
      role: "",
      cv: "",
      result: "Pending",
      interviewer: "",
      feedback: "",
      date_time: "",
    },
    validationSchema: newCandidateFormSchema,

    onSubmit: (values) => {
      try {
        fetch("http://localhost:6001/newcandidate", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }).then((res) => {
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
        <h2>Add a new candidate information</h2>
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
            value={1}
            label="Interview Stage"
            disabled
          />
          <TextField
            margin="normal"
            fullWidth
            id="username"
            variant="filled"
            label="Candidate Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            fullWidth
            name="role"
            variant="filled"
            label="Role"
            id="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
          />
          <TextField
            margin="normal"
            fullWidth
            name="cv"
            variant="filled"
            label="CV URL"
            id="cv"
            value={formik.values.cv}
            onChange={formik.handleChange}
            error={formik.touched.cv && Boolean(formik.errors.cv)}
            helperText={formik.touched.cv && formik.errors.cv}
          />
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
            sx={{ mt: 3, mb: 2, py: 1, bgcolor: "rgb(57,14,59)" }}
          >
            Submit Information
          </Button>
        </Box>
        <Link href={"/"}>Go back to the main page</Link>
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
