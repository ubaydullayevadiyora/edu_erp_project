import type { GroupStudentsType, Student } from "@types";
import { Table } from "antd";
import { StudentColumns } from "../table-columns";
import { useStudent } from "@hooks";
import { useState } from "react";

const GroupStudents = ({ students }: GroupStudentsType) => {
  console.log(students);
  
  const [params] = useState({
    page: 1,
    limit: 6,
  });
  const { data } = useStudent(params);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <h2 className="text-lg font-semibold text-textMain mb-4">
        Group Students
      </h2>

      <Table<Student>
        columns={StudentColumns}
        dataSource={data?.data?.students}
        rowKey={(row) => row.id}
        pagination={false}
        className="custom-ant-table"
      />
    </div>
  );
};

export default GroupStudents;
