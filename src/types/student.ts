import type dayjs from "dayjs";

export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  gender: "male" | "female";
  date_of_birth: dayjs.Dayjs | null;
}
