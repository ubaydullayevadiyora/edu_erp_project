import { Tooltip, Button } from "antd";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import type {Lessons } from "@types";

const LessonsLists = ({ lessons }: { lessons: Lessons[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  const goNext = () => {
    containerRef.current?.scrollBy({ left: 50, behavior: "smooth" });
  };

  const goPrev = () => {
    containerRef.current?.scrollBy({ left: -50, behavior: "smooth" });
  };

  const isStartDisabled = () => !containerRef.current || scrollPosition <= 5;
  const isEndDisabled = () => {
    if (!containerRef.current) return true;
    const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;
    return scrollLeft + clientWidth >= scrollWidth - 3;
  };

  return (
    <div className="flex gap-2 items-center">
      <Button type="primary" onClick={goPrev} disabled={isStartDisabled()}>
        prev
      </Button>
      <div
        className="overflow-scroll flex gap-1 [&::-webkit-scrollbar]:hidden"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {lessons.map((lesson: Lessons) => (
          <Tooltip
            key={lesson.id}
            title={
              <div className="space-y-1">
                <div>
                  <strong>Status:</strong> {lesson.status || "—"}
                </div>
                <div>
                  <strong>Note:</strong> {lesson.notes || "—"}
                </div>
              </div>
            }
          >
            <div className="p-3 bg-[#ccc] rounded-lg cursor-pointer">
              <span>{dayjs(lesson.date).format("DD-MM")}</span>
            </div>
          </Tooltip>
        ))}
      </div>
      <Button type="primary" onClick={goNext} disabled={isEndDisabled()}>
        next
      </Button>
    </div>
  );
};

export default LessonsLists;
