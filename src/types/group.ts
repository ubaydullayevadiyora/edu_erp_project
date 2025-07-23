import dayjs from "dayjs";
import type { Lessons } from "./general";
import type { Student } from "./student";

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
  lessons: Lessons[];
}

export interface GroupStudentsType {
  students:Student[]
}
