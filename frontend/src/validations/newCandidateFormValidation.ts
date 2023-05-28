import { object, string } from "yup";

export const newCandidateFormSchema = object({
  name: string().required("Please enter the name of the candidate"),
  role: string().required("Please enter the desired role of the candidate"),
  cv: string().required("Please enter applicants' CV url"),
  interviewer: string().required(
    "Please enter the name(s) of the interviewer(s)"
  ),
});
