import type { GroupStudentsType, Student } from "@types";
import { Table } from "antd";
import { StudentColumns } from "../table-columns"; // ✅ shu yerda import qilingan

const GroupStudents = ({ students }: GroupStudentsType) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Group Students</h2>

      <Table<Student>
        columns={StudentColumns} // ✅ Tayyor ustunlar
        dataSource={students} // ✅ Student[]
        rowKey={(row) => row.id}
        pagination={false}
      />
    </div>
  );
};

export default GroupStudents;
