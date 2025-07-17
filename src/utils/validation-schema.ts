import * as yup from "yup";
// group
export const groupFormSchema = yup.object().shape({
  name: yup.string().min(5).required("Name is required"),
  status: yup.string().required("Status is required"),
  course_id: yup
    .number()
    .typeError("Course is required")
    .required("Course is required"),
  start_date: yup.mixed().nullable().required("Start date is required"),
  end_date: yup.mixed().nullable().required("End date is required"),
});

// course
export const courseFormSchema = yup.object().shape({
  title: yup
    .string()
    .required("Kurs nomi majburiy")
    .min(3, "Kurs nomi kamida 3 ta belgidan iborat bo'lishi kerak"),

  description: yup
    .string()
    .required("Tavsif majburiy")
    .min(10, "Tavsif juda qisqa"),

  price: yup
    .number()
    .typeError("Narx faqat raqam bo'lishi kerak")
    .required("Narx majburiy")
    .positive("Narx musbat bo'lishi kerak"),

  duration: yup.string().required("Davomiylik majburiy (masalan, 3 oy)"),

  lessons_in_a_week: yup
    .number()
    .typeError("Haftalik darslar soni raqam bo'lishi kerak")
    .required("Haftalik darslar soni majburiy")
    .min(1, "Kamida 1 marta haftasiga bo'lishi kerak"),

  lesson_duration: yup.string().required("Har bir dars davomiyligi majburiy"),
});

// student
export const studentFormSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),

  last_name: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),

  email: yup.string().email("Email is invalid").required("Email is required"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^(\+998)?[0-9]{9,12}$/, "Phone number is invalid"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["male", "female"], "Gender must be either male or female"),

  date_of_birth: yup
    .mixed<any>()
    .nullable()
    .required("Iltimos, tug'ilgan sanani kiriting"),
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
    .required("Phone number is required")
    .matches(/^(\+998)?[0-9]{9,12}$/, "Phone number is invalid"),
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
    .matches(/^(\+998)?[0-9]{9,12}$/, "Call number is invalid"),

  
});
