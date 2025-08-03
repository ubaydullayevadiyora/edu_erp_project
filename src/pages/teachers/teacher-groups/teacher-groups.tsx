import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useTeacherGroupStudents } from "@hooks";

const TeacherGroups = () => {
  const { data } = useTeacherGroupStudents();
  const navigate = useNavigate();

  const columns = [
    {
      title: "Group Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (course: any) => course?.name,
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      render: (branch: any) => branch?.name,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          type="link"
          onClick={() => navigate(`/teacher/groups/${record.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Groups</h1>
      <Table
        dataSource={data?.data || []}
        columns={columns}
        rowKey={(row) => row.id}
        pagination={false}
      />
    </div>
  );
};

export default TeacherGroups;
