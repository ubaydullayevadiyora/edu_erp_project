import { Tooltip, Button } from "antd";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import type { Lessons } from "@types";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const LessonsLists = ({ lessons }: { lessons: Lessons[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold text-textMain mb-4">
        Group Lessons
      </h2>

      <div className="flex items-center gap-3">
        <Button
          shape="circle"
          icon={<LeftOutlined />}
          type="default"
          size="middle"
          onClick={goPrev}
          disabled={isStartDisabled()}
          className="shadow-sm"
        />

        <div
          className="flex overflow-x-auto gap-3 no-scrollbar scroll-smooth"
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
              <div
                className={`
                flex flex-col justify-center items-center flex-shrink-0 
                w-20 h-20 bg-soft rounded-xl shadow-sm border 
                hover:bg-primary hover:text-white transition-all duration-300
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
          ))}
        </div>

        <Button
          shape="circle"
          icon={<RightOutlined />}
          type="default"
          size="middle"
          onClick={goNext}
          disabled={isEndDisabled()}
          className="shadow-sm"
        />
      </div>
    </div>
  );
};

export default LessonsLists;
