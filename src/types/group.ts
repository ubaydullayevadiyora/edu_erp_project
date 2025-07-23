import dayjs from "dayjs";
import type { Lessons } from "./general";
import type { Student } from "./student";
import type { JSX } from "react/jsx-runtime";

export interface Group {
  id: number;
  name: string;
  courseId: number;
  status: string;
  start_date: dayjs.Dayjs | null;
  start_time: dayjs.Dayjs | null;
  roomId: number;
}

export interface GroupLessonsType {
  map(arg0: (lesson: Lessons) => JSX.Element): import("react").ReactNode;
  lessons: Lessons[];
}

export interface GroupStudentsType {
  students:Student[]
}
