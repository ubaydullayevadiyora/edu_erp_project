import { Button, Collapse, Tag } from "antd";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import AddTeacherOrStudentModal from "./modal";
import type { GroupTeachersType } from "@types";

const { Panel } = Collapse;

const GroupTeachers = ({ teachers, groupId }: GroupTeachersType) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Teachers</h2>
        <Button
          icon={<UserPlus size={16} />}
          type="primary"
          onClick={() => setOpen(true)}
        >
          Add
        </Button>
      </div>

      {/* Collapsed Teachers List */}
      <Collapse defaultActiveKey={["1"]}>
        <Panel header={`Teachers (${teachers.length})`} key="1">
          <div className="space-y-2">
            {teachers.map((tch: any) => {
              const fullName = `${tch.teacher.first_name} ${tch.teacher.last_name}`;
              const isActive = tch.status;
              const isMain = tch.role === "main";

              return (
                <div
                  key={tch.id}
                  className="w-full bg-gray-100 px-4 py-3 rounded-xl shadow-sm flex justify-between items-center"
                >
                  <div className="font-medium text-base text-gray-800">
                    {fullName}
                  </div>
                  <div className="flex gap-2 items-center">
                    <Tag color={isMain ? "blue" : "purple"}>
                      {isMain ? "Main" : "Assistant"}
                    </Tag>
                    <Tag color={isActive ? "green" : "red"}>
                      {isActive ? "Active" : "Inactive"}
                    </Tag>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </Collapse>

      {/* Modal */}
      <AddTeacherOrStudentModal
        open={open}
        toggle={() => setOpen(false)}
        addingTeacher={true}
        groupId={groupId}
      />
    </div>
  );
};

export default GroupTeachers;
