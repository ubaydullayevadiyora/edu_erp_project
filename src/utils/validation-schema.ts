import * as yup from "yup";

export const groupFormSchema = yup.object().shape({
  name: yup.string().min(5).required("Name is required"),
  status: yup.string().required("Status is required"),
  course_id: yup.number().required("Course is required"),
});
