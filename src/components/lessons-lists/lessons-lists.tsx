import { Tooltip, Button, Tag, Divider } from "antd";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import type { Lessons } from "@types";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import LessonModal from "./lesson-modal";

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 border-green-300 text-green-700";
    case "cancelled":
      return "bg-red-100 border-red-300 text-red-700";
    case "in_progress":
      return "bg-yellow-100 border-yellow-300 text-yellow-700";
    default:
      return "bg-gray-100 border-gray-300 text-gray-700";
  }
};

const LessonsLists = ({ lessons }: { lessons: Lessons[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState<Lessons | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (lesson: Lessons) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLesson(null);
    setIsModalOpen(false);
  };

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  const goNext = () => {
    containerRef.current?.scrollBy({ left: 120, behavior: "smooth" });
  };

  const goPrev = () => {
    containerRef.current?.scrollBy({ left: -120, behavior: "smooth" });
  };

  const isStartDisabled = () => !containerRef.current || scrollPosition <= 5;
  const isEndDisabled = () => {
    if (!containerRef.current) return true;
    const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;
    return scrollLeft + clientWidth >= scrollWidth - 3;
  };

  useEffect(() => {
    if (containerRef.current) {
      const index = lessons.findIndex(
        (l) =>
          dayjs(l.date).isSame(dayjs(), "day") || l.status === "in_progress"
      );
      if (index !== -1) {
        const element = containerRef.current.children[index] as HTMLElement;
        element?.scrollIntoView({ inline: "center", behavior: "smooth" });
      }
    }
  }, [lessons]);

  const countByStatus = (status: string) =>
    lessons.filter((lesson) => {
      const isToday = dayjs(lesson.date).isSame(dayjs(), "day");
      if (status === "in_progress" && isToday && lesson.status === "new") {
        return true;
      }
      return lesson.status === status;
    }).length;

  return (
    <>
      <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Group Lessons
        </h2>

        {/* Status Tags */}
        <div className="mb-4 flex flex-wrap gap-2 text-sm text-gray-600">
          <Tag color="green">Done: {countByStatus("completed")}</Tag>
          <Tag color="yellow">Progress: {countByStatus("in_progress")}</Tag>
          <Tag color="red">Cancel: {countByStatus("cancelled")}</Tag>
          <Tag color="grey">New: {countByStatus("new")}</Tag>
        </div>

        <Divider className="my-2" />

        {/* Lessons Scroll */}
        <div className="flex items-center gap-3">
          <Button
            shape="circle"
            icon={<LeftOutlined />}
            onClick={goPrev}
            disabled={isStartDisabled()}
            className="shadow-sm"
          />

          <div
            className="flex overflow-x-auto gap-3 no-scrollbar scroll-smooth"
            ref={containerRef}
            onScroll={handleScroll}
          >
            {lessons.map((lesson) => {
              const isToday = dayjs(lesson.date).isSame(dayjs(), "day");
              const displayStatus =
                isToday && lesson.status === "new"
                  ? "in_progress"
                  : lesson.status;

              const isDisabled = displayStatus === "completed";

              return (
                <Tooltip
                  key={lesson.id}
                  title={
                    <div className="space-y-1 text-sm">
                      <div>
                        <strong>Status:</strong> {displayStatus || "—"}
                      </div>
                      <div>
                        <strong>Note:</strong> {lesson.notes || "—"}
                      </div>
                    </div>
                  }
                  overlayInnerStyle={{
                    backgroundColor: "#FFFFFF",
                    color: "#000000",
                    border: "1px solid #E5E7EB",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    onClick={() =>
                      !isDisabled ? openModal(lesson) : undefined
                    }
                    className={`flex flex-col justify-center items-center flex-shrink-0 
                      w-20 h-20 rounded-xl border transition-all duration-300 
                      ${
                        isDisabled
                          ? "cursor-not-allowed"
                          : "cursor-pointer hover:-translate-y-1 hover:shadow"
                      } 
                      ${getStatusColor(displayStatus)}
                    `}
                  >
                    <span className="text-lg font-bold">
                      {dayjs(lesson.date).format("DD")}
                    </span>
                    <span className="text-xs uppercase tracking-wide">
                      {dayjs(lesson.date).format("MMM")}
                    </span>
                  </div>
                </Tooltip>
              );
            })}
          </div>

          <Button
            shape="circle"
            icon={<RightOutlined />}
            onClick={goNext}
            disabled={isEndDisabled()}
            className="shadow-sm"
          />
        </div>
      </div>

      {/* Modal */}
      <LessonModal
        open={isModalOpen}
        toggle={closeModal}
        update={selectedLesson}
      />
    </>
  );
};

export default LessonsLists;
