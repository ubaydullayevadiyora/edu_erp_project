import { Collapse, Table, Button, Modal, message } from "antd";
import { useStudent } from "@hooks";
import { useState } from "react";
import type { Student, Lessons } from "@types";
import { minimalStudentColumns } from "../table-columns";
import LessonsLists from "../lessons-lists/lessons-lists";

interface Props {
  students: Student[]; 
  lessons: Lessons[]; 
  onAddStudents?: (studentIds: React.Key[]) => void; 
  groupId?: number; 
}

const GroupStudents = ({
  students,
  lessons,
  onAddStudents,
  
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [params] = useState({ page: 1, limit: 100 });
  const [localStudents, setLocalStudents] = useState<Student[]>(students); 

  const { data: allStudentsData } = useStudent(params); 

  console.log("All students data:", allStudentsData);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRowKeys([]);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleAddStudentsToGroup = async () => {
    console.log("Qo'shiladigan student ID'lar:", selectedRowKeys);

    try {
      const selectedStudents =
        allStudentsData?.data?.filter((student: Student) =>
          selectedRowKeys.includes(student.id)
        ) || [];

      setLocalStudents((prev) => [...prev, ...selectedStudents]);

      if (onAddStudents && selectedRowKeys.length > 0) {
        await onAddStudents(selectedRowKeys);
      }

      message.success(
        `${selectedRowKeys.length} ta student guruhga qo'shildi!`
      );
      closeModal();
    } catch (error) {
      console.error("Xatolik:", error);
      message.error("Studentlarni qo'shishda xatolik yuz berdi!");
    }
  };
  // COLLAPSE ITEM
  const collapseItems = Array.isArray(localStudents)
    ? localStudents.map((student) => {
       
        const studentLessons = Array.isArray(lessons)
          ? lessons.filter((lesson) => {
             
              if (Array.isArray(lesson.studentId)) {
                return lesson.studentId.includes(student.id);
              }
             
              return lesson.studentId === student.id;
            })
          : [];

        return {
          key: student.id,
          label: `${student.first_name} ${student.last_name || ""}`.trim(),
          children: (
            <div className="space-y-2">
              {studentLessons && studentLessons.length > 0 ? (
                <LessonsLists lessons={studentLessons} />
              ) : (
                <p className="text-gray-500 italic">
                  Hali darslar tayinlanmagan
                </p>
              )}
            </div>
          ),
        };
      })
    : [];

  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-textMain">Group Students</h2>
        <Button type="primary" onClick={openModal}>
          + Add student
        </Button>
      </div>

      {/* GROUP STUDENTS*/}
      {collapseItems.length > 0 ? (
        <Collapse accordion items={collapseItems} className="bg-gray-50" />
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>Bu guruhda hali studentlar yo'q.</p>
          <p className="text-sm">
            "+ Add student" tugmasini bosib studentlar qo'shing.
          </p>
        </div>
      )}

      <Modal
        title="Guruhga studentlar qo'shish"
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleAddStudentsToGroup}
        okText="Tanlanganni qo'shish"
        cancelText="Bekor qilish"
        okButtonProps={{ disabled: selectedRowKeys.length === 0 }}
        width={600}
      >
        <Table<Student>
          columns={minimalStudentColumns}
          dataSource={
            Array.isArray(allStudentsData?.data.data)
              ? allStudentsData.data.data.filter(
                  (student:Student) =>
                    !localStudents.some(
                      (groupStudent) => groupStudent.id === student.id
                    )
                )
              : []
          }
          rowKey={(row) => row.id}
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
          }}
          pagination={false}
          size="small"
          locale={{ emptyText: "Qo'shish uchun studentlar topilmadi" }}
        />
      </Modal>
    </div>
  );
};

export default GroupStudents;
