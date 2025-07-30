import { useState } from "react";
import { Collapse, Modal, Button, message } from "antd";
import {
  Mail,
  Phone,
  BadgeCheck,
  PlusCircle,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { GroupTeachersType, Teacher } from "@types";

const { Panel } = Collapse;

interface GroupTeachersProps extends GroupTeachersType {
  groupId: number;
}

const GroupTeachers = ({ teachers, groupId }: GroupTeachersProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // 👇 barcha teacherlarni olish
  const { data: allTeachers = [], isLoading } = useQuery({
    queryKey: ["all-teachers"],
    queryFn: async () => {
      const res = await axios.get<Teacher[]>("/teachers");
      return res.data;
    },
  });

  // 👇 teacher qo‘shish
  const { mutate: addTeacher } = useMutation({
    mutationFn: async (teacherId: number) => {
      return await axios.post(`/group-teachers`, {
        group_id: groupId,
        teacher_id: teacherId,
      });
    },
    onSuccess: () => {
      message.success("Teacher added successfully");
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
      setIsModalOpen(false);
    },
    onError: () => {
      message.error("Failed to add teacher");
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-textMain">Group Teachers</h1>
        <Button
          icon={<PlusCircle size={16} />}
          type="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add Teacher
        </Button>
      </div>

      <Collapse
        defaultActiveKey={["0"]}
        className="bg-white rounded-xl border-none"
        expandIconPosition="end"
      >
        {teachers.map((item, index) => (
          <Panel
            header={
              <div className="flex justify-between items-center">
                <span className="font-medium text-base text-textMain">
                  {item.first_name} {item.last_name}
                </span>
                <span className="text-xs bg-blue-600 text-white rounded-full px-2 py-1 capitalize">
                  {item.role}
                </span>
              </div>
            }
            key={index.toString()}
          >
            <div className="text-sm space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>{item.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>{item.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-primary" />
                <span className="capitalize">{item.role}</span>
              </p>
              {/* optional: agar `start_date` va `end_date` bo'lsa qo‘shish mumkin */}
            </div>
          </Panel>
        ))}
      </Collapse>

      {/* ➕ Add Teacher Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title="Add Teacher to Group"
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {allTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <div>
                  <p className="font-medium">
                    {teacher.first_name} {teacher.last_name}
                  </p>
                  <p className="text-xs text-gray-500">{teacher.email}</p>
                </div>
                <Button
                  type="primary"
                  
                  onClick={() => addTeacher(teacher.id)}
                >
                  Add
                </Button>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default GroupTeachers;
