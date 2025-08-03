import { useState } from "react";
import { Button, Table, Tag } from "antd";
import { UserPlus } from "lucide-react";
import AddTeacherOrStudentModal from "./modal";
import type { GroupStudentsType } from "@types";
import dayjs from "dayjs";

type Props = GroupStudentsType & { groupId: number };

const GroupStudents = ({ students, groupId }: Props) => {
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Joined At",
      dataIndex: "joined_at",
      key: "joined_at",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "status",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
  ];



  const studentLists = students?.map((item: any) => item.student) || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Students</h2>
        <Button
          icon={<UserPlus size={16} />}
          type="primary"
          onClick={() => setOpen(true)}
        >
          Add
        </Button>
      </div>

      {/* Studentlar jadvali */}
      <Table
        dataSource={studentLists}
        columns={columns}
        rowKey="id"
        pagination={false}
      />

      {/* <div>
        {students.map((item:any)=>(
          <div key={item.student.id}>{item.student.first_name}</div>
        ))}

      </div> */}

      {/* Add modal */}
      <AddTeacherOrStudentModal
        open={open}
        toggle={() => setOpen(false)}
        addingTeacher={false}
        groupId={groupId}
      />
    </div>
  );
};

export default GroupStudents;
