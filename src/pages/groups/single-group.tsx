import { useParams } from "react-router-dom";
import { useGroup } from "@hooks";
import { GroupLessons, GroupStudents, GroupTeachers } from "@components";
import { Collapse } from "antd";

const { Panel } = Collapse;

const SingleGroup = () => {
  const { id } = useParams<{ id: string }>();
  const { students, lessons, teachers } = useGroup(
    { page: 1, limit: 10 },
    Number(id)
  );

  return (
    <div className="p-6 bg-soft min-h-screen space-y-6 font-sans">
      <div className="flex flex-wrap gap-6">
        {/* Teachers Card */}
        {teachers?.data?.length > 0 && (
          <div className="flex-1 min-w-[300px] bg-card shadow-md rounded-2xl p-4">
            <GroupTeachers teachers={teachers?.data} />
          </div>
        )}

        {/* Group Info Card */}
        <div className="flex-1 min-w-[300px] bg-card shadow-md rounded-2xl p-4">
          <h1 className="text-lg font-semibold text-textMain mb-2">
            Group Information
          </h1>
          <Collapse
            defaultActiveKey={["1"]}
            className="bg-white rounded-xl border-none"
          >
            <Panel header="Group Information" key="1">
              <p className="text-gray-500">Ma'lumotlar hali kiritilmagan.</p>
            </Panel>
          </Collapse>
        </div>
      </div>

      {/* Lessons */}
      {lessons?.data?.lessons?.length > 0 && (
        <div className="bg-card shadow-md rounded-2xl p-4">
          <GroupLessons lessons={lessons?.data.lessons} />
        </div>
      )}

      {/* Students */}
      {students?.data?.length > 0 && (
        <div className="bg-card shadow-md rounded-2xl p-4">
          <GroupStudents students={students?.data} />
        </div>
      )}
    </div>
  );
};

export default SingleGroup;
