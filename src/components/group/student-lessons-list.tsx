import { Card, Tag } from "antd";
import dayjs from "dayjs";

interface StudentLessonsListProps {
  lessons: {
    id: number;
    title: string;
    date: string;
  }[];
  studentId: number;
}

// hard code data
const getRandomStatus = () => {
  const statuses = ["came", "absent", "late"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const statusColorMap: Record<string, string> = {
  came: "green",
  absent: "red",
  late: "orange",
};

const statusLabelMap: Record<string, string> = {
  came: "Keldi",
  absent: "Kelmagan",
  late: "Kechikdi",
};

function StudentLessonsList({ lessons }: StudentLessonsListProps) {
  return (
    <div className="space-y-2">
      {lessons.map((lesson) => {
        const status = getRandomStatus();
        return (
          <Card
            key={lesson.id}
            size="small"
            className="shadow rounded-lg"
            title={lesson.title}
            extra={
              <Tag color={statusColorMap[status]}>{statusLabelMap[status]}</Tag>
            }
          >
            <p className="text-sm text-gray-500">
              Sana: {dayjs(lesson.date).format("DD-MM-YYYY")}
            </p>
          </Card>
        );
      })}
    </div>
  );
}

export default StudentLessonsList;
