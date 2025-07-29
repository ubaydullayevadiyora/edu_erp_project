import * as yup from "yup";

// group
export const groupFormSchema = yup.object().shape({
  name: yup.string().min(5).required("Name is required"),
  status: yup.string().required("Status is required"),
  courseId: yup
    .number()
    .typeError("Course is required")
    .required("Course is required"),
  start_date: yup.mixed().nullable().required("Start date is required"),
  start_time: yup.string().required("Start time is required"),
  roomId: yup.number().required("room id is required")
});

// course
export const courseFormSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description is too short"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),

  duration: yup
    .number()
    .typeError("Duration must be a number")
    .required("Duration is required"),

  lessons_in_a_week: yup
    .number()
    .typeError("Lessons per week must be a number")
    .required("Lessons per week is required")
    .min(1, "There must be at least 1 lesson per week"),

  lessons_in_a_month: yup
    .number()
    .typeError("Lessons per month must be a number")
    .required("Lessons per month is required"),

  lesson_duration: yup
    .number()
    .typeError("Lesson duration must be a number")
    .required("Lesson duration is required"),
});

// student
export const studentFormSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("First name is required")
    .min(2, "Minimum 2 characters"),

  last_name: yup
    .string()
    .required("Last name is required")
    .min(2, "Minimum 2 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),

  phone: yup
    .string()
    .required("Call number is required")
    .matches(/^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/, "Call number is invalid"),

  password: yup.string().when("update", {
    is: false, // only required when creating
    then: (schema) =>
      schema
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "At least one uppercase letter")
        .matches(/[a-z]/, "At least one lowercase letter")
        .matches(/\d/, "At least one number")
        .matches(/[@$!%*?&]/, "At least one special character"),
    otherwise: (schema) => schema.notRequired(),
  }),

  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),

  gender: yup.string().oneOf(["male", "female"]).required("Gender is required"),

  date_of_birth: yup
    .date()
    .required("Date of birth is required")
    .typeError("Invalid date"),
});

// teacher
export const teacherFormSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .when("$isUpdate", {
      is: false,
      then: (schema) => schema.required("Password is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  phone: yup
    .string()
    .required("Call number is required")
    .matches(/^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/, "Call number is invalid"),
  role: yup.string().required("Role is required"),

  branchId: yup.array().of(yup.number()).required("Select Branch"),
});

// branches
export const branchFormSchema = yup.object().shape({
  name: yup.string().required("Branch name is required"),

  address: yup.string().required("Address is required"),

  call_number: yup
    .string()
    .required("Call number is required")
    .matches(/^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/, "Call number is invalid"),
});

// rooms
export const roomFormSchema = yup.object().shape({
  branchId: yup.number().required("barnch id is required"),
  name: yup.string().required("room name is required"),
  capacity: yup.number().required("room capacity si required"),
});
