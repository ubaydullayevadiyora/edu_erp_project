import { useParams } from "react-router-dom";
import { useTeacherGroupStudents } from "@hooks";
import { Button, Table } from "antd";
import { Switch } from "antd";
import { useEffect, useState } from "react";
const TeacherGroupStudents = () => {
  const [students, setStudents] = useState([]);
  const { id } = useParams();
  const { data } = useTeacherGroupStudents(Number(id));

  useEffect(() => {
    const new_arr = data?.data?.groupStudents?.map((item: any) => {
      return {
        studentId: item.student.id,
        status: true,
        full_name: item?.student.first_name + " " + item?.student.last_name,
      };
    });
    setStudents(new_arr);
  }, [id, data?.data?.groupStudents]);
  const handleChange = (id: number) => {
    students.forEach((item: any) => {
      if (item.studentId === id) {
        item.status = !item.status;
      }
    });
  };
  const submit = () => {
    console.log(students, "students");
  };
  const columns = [
    {
      title: "Full name",
      key: "full_name",
      dataIndex: "full_name",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Switch
          defaultChecked
          onChange={() => handleChange(record.studentId)}
        />
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={students}
        rowKey={(row) => row.studentId!}
      />
      <Button type="primary" onClick={submit}>
        submit
      </Button>
    </div>
  );
};

export default TeacherGroupStudents;
