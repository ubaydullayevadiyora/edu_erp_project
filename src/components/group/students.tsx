import type { GroupStudentsType, Student } from "@types";
import { Table, Button, Modal } from "antd";
import { StudentColumns, minimalStudentColumns } from "../table-columns";
import { useStudent } from "@hooks";
import { useState } from "react";

const GroupStudents = ({ students }: GroupStudentsType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [params] = useState({ page: 1, limit: 10 });

  const { data: allStudentsData } = useStudent(params);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRowKeys([]);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleAddStudentsToGroup = () => {
    console.log("Tanlangan student ID'lar:", selectedRowKeys);
    // ✳️ Bu yerda POST yoki mutation yoziladi
    closeModal();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      {/* Sarlavha va tugma */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-textMain">Group Students</h2>
        <Button type="primary" onClick={openModal}>
          + Add student
        </Button>
      </div>

      {/* Groupga tegishli studentlar */}
      <Table<Student>
        columns={StudentColumns}
        dataSource={students}
        rowKey={(row) => row.id}
        pagination={false}
      />

      {/* Modal: mavjud studentlardan tanlash */}
      <Modal
        title="Add Students to Group"
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleAddStudentsToGroup}
        okText="Add selected"
      >
        <Table<Student>
          columns={minimalStudentColumns}
          dataSource={
            Array.isArray(allStudentsData?.data) ? allStudentsData.data : []
          }
          rowKey={(row) => row.id}
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
          }}
          pagination={false}
          size="small"
        />
      </Modal>
    </div>
  );
};

export default GroupStudents;
