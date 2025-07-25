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
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        type="primary"
        onClick={goPrev}
        disabled={isStartDisabled()}
      ></Button>

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
            <div
              style={{ width: "200px", height: "70px" }}
              className={`
 w-150 h-16  flex flex-col items-center justify-center
  rounded-lg cursor-pointer text-sm
  bg-blue-200 hover:bg-gray-300 transition
`}
            >
              <span className="text-lg font-semibold">
                {dayjs(lesson.date).format("DD")}
              </span>
              <span className="text-xs text-gray-600 uppercase tracking-wide">
                {dayjs(lesson.date).format("MMM")}
              </span>
            </div>
          </Tooltip>
        ))}
      </div>

      <Button
        shape="circle"
        type="primary"
        onClick={goNext}
        disabled={isEndDisabled()}
        icon={<RightOutlined />}
      ></Button>
    </div>
  );
};

export default LessonsLists;
