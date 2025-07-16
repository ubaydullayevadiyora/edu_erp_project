import dayjs from "dayjs";

export interface Group {
  id: number;
  name: string;
  course_id: number;
  status: string;
  start_date: dayjs.Dayjs | null;
  end_date: dayjs.Dayjs | null;
}
