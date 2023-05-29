import { object, string } from "yup";

export const newInterviewStageValidation = object({
  interviewer: string().required(
    "Please enter the name(s) of the interviewer(s)"
  ),
});
