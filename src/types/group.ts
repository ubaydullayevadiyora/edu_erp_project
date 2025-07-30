import dayjs from "dayjs";
import type { Lessons } from "./general";
import type { Student } from "./student";
import type { Teacher } from "./teacher";
// GROUP
export interface Group {
  id: number;
  name: string;
  courseId: number;
  status: string;
  start_date: dayjs.Dayjs | null;
  start_time: dayjs.Dayjs | null;
  room: {
    id: number;
    name: string;
  };
  course: {
    id: number;
    name: string;
    price: number;
    duration: number;
  };
}

export interface GroupLessonsType {
  lessons: Lessons[];
}

export interface GroupStudentsType {
  students: Student[];
}

export interface GroupTeachersType {
  teachers: Teacher[];
  groupId: number;
}
