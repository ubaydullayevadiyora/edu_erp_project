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
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
     
      <div className="flex flex-wrap gap-4">
        {/* Teachers collapse */}
        {teachers?.data?.length > 0 && (
          <div className="flex-1 min-w-[300px]">
            <GroupTeachers teachers={teachers?.data} />
          </div>
        )}

        {/* Group Info collapse*/}

        <div className="flex-1 min-w-[300px]">
          <h1 className="text-xl font-bold mb-2" >Group Information</h1>
          <Collapse defaultActiveKey={["1"]}>
            <Panel header="Group Information" key="1">
              <p>Ma'lumotlar hali kiritilmagan.</p>
            </Panel>
          </Collapse>
        </div>
      </div>

    
      {lessons?.data?.lessons?.length > 0 && (
        <GroupLessons lessons={lessons?.data.lessons} />
      )}

     
      {students?.data?.length > 0 && (
        <GroupStudents students={students?.data} />
      )}
    </div>
  );
};

export default SingleGroup;
