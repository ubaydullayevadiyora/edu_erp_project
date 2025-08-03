import { useParams } from "react-router-dom";
import { useGroup } from "@hooks";
import { GroupLessons, GroupStudents, GroupTeachers } from "@components";
import { Collapse } from "antd";
import dayjs from "dayjs";

const { Panel } = Collapse;

const SingleGroup = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const { data, students, lessons, teachers } = useGroup(
    { page: 1, limit: 6 },
    numericId
  );

  return (
    <div className="p-6 min-h-screen space-y-6 font-sans">
      <div className="flex flex-wrap gap-6">
        {/* Teachers Card */}
        {teachers?.data?.length > 0 && (
          <div className="flex-1 min-w-[300px] shadow-md rounded-2xl p-4 bg-white">
            <GroupTeachers
              teachers={teachers?.data}
              groupId={numericId}
            />
          </div>
        )}

        {/* Group Info Card */}
        <div className="flex-1 min-w-[300px] shadow-md rounded-2xl p-4 bg-white">
          <h1 className="text-lg font-semibold mb-2 text-gray-800 p-1">
            Group Information
          </h1>
          <Collapse 
            defaultActiveKey={["1"]}
            className="bg-white rounded-xl border-none"
          >
            <Panel header="Group Details" key="1">
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Group Name:</strong> {data?.data.name}
                </p>
                <p>
                  <strong>Course Title:</strong> {data?.data.course?.title}
                </p>
                <p>
                  <strong>Room Name:</strong> {data?.data.lessons?.room?.name}
                </p>
                <p>
                  <strong>Status:</strong> {data?.data.status}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {data?.data.start_date
                    ? dayjs(data?.data.start_date).format("YYYY-MM-DD")
                    : "no data"}
                </p>
                <p>
                  <strong>Start Time:</strong>{" "}
                  {data?.data.start_time
                    ? dayjs(data?.data.start_time).format("HH:mm")
                    : "no data"}
                </p>
                <p>
                  <strong>Students Count:</strong> {students?.data?.length ?? 0}
                </p>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>

      {/* Lessons */}
      {lessons?.data?.lessons?.length > 0 && (
        <div className="shadow-md rounded-2xl p-4 bg-white">
          <GroupLessons lessons={lessons?.data.lessons} />
        </div>
      )}

      {/* Students */}

      <div className="shadow-md rounded-2xl p-4 bg-white">
        
        <GroupStudents students={students?.data} groupId={numericId} />
      </div>
    </div>
  );
};

export default SingleGroup;
