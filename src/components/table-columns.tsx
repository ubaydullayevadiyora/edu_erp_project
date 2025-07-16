import { type TableProps } from "antd";

import type { Course, Group, Student, Teacher } from "@types";

// group
export const GroupColumns: TableProps<Group>["columns"] = [
  {
    title: "Group",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Course",
    dataIndex: "course",
    key: "course",
    render: (course: { title: string }) => <span>{course.title}</span>,
  },
  {
    title: "Start date",
    dataIndex: "start_date",
    key: "start_date",
  },
  {
    title: "End date",
    dataIndex: "end_date",
    key: "end_date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

// course
export const CourseColumns: TableProps<Course>["columns"] = [
  {
    title: "Course",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Lesson/Week",
    dataIndex: "lessons_in_a_week",
    key: "lessons_in_a_week",
  },
  {
    title: "Lesson/Duration",
    dataIndex: "lesson_duration",
    key: "lesson_duration",
  },

];

// student
export const StudentColumns: TableProps<Student>["columns"] = [
  {
    title: "Firstname",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Lastname",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
  },
  {
    title: "Date of Birth",
    dataIndex: "date_of_birth",
    key: "date_of_birth",
  },
];

// teacher
export const TeacherColumns: TableProps<Teacher>["columns"] = [
  {
    title: "Firstname",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Lastname",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];