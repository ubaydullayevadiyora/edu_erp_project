import { useParams } from "react-router-dom";
import { useGroup } from "@hooks";
import { GroupLessons, GroupStudents, GroupTeachers } from "@components";
import { Collapse } from "antd";
import dayjs from "dayjs";

const { Panel } = Collapse;

const SingleGroup = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const { group, students, lessons, teachers } = useGroup(
    { page: 1, limit: 10 },
    numericId
  );

  return (
    <div className="p-6 min-h-screen space-y-6 font-sans">
      <div className="flex flex-wrap gap-6">
        {/* Teachers Card */}
        {teachers?.data?.length > 0 && (
          <div className="flex-1 min-w-[300px] shadow-md rounded-2xl p-4 bg-white">
            <GroupTeachers teachers={teachers?.data.data} groupId={0} />
          </div>
        )}

        {/* Group Info Card */}
        <div className="flex-1 min-w-[300px] shadow-md rounded-2xl p-4 bg-white">
          <h1 className="text-lg font-semibold mb-2 text-gray-800">
            Group Information
          </h1>
          <Collapse
            defaultActiveKey={["1"]}
            className="bg-white rounded-xl border-none"
          >
            <Panel header="Group Details" key="1">
              {group ? (
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Group Name:</strong> {group.name}
                  </p>
                  <p>
                    <strong>Course ID:</strong> {group.course?.id ?? "N/A"}
                  </p>
                  <p>
                    <strong>Room ID:</strong> {group.room?.id ?? "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong> {group.status ?? "N/A"}
                  </p>
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {group.start_date
                      ? dayjs(group.start_date).format("YYYY-MM-DD")
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Start Time:</strong>{" "}
                    {group.start_time
                      ? dayjs(group.start_time).format("HH:mm")
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Students Count:</strong>{" "}
                    {students?.data?.length ?? 0}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">Ma'lumotlar hali kiritilmagan.</p>
              )}
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
      {students?.data?.length > 0 && (
        <div className="shadow-md rounded-2xl p-4 bg-white">
          <GroupStudents students={students?.data} lessons={lessons?.data} />
        </div>
      )}
    </div>
  );
};

export default SingleGroup;
