import dayjs from "dayjs";
import type { Lessons } from "@types";

export function getComputedLessonStatus(lesson: Lessons): string {
  const isToday = dayjs(lesson.date).isSame(dayjs(), "day");
  if (lesson.status === "new" && isToday) return "in_progress";
  return lesson.status;
}
