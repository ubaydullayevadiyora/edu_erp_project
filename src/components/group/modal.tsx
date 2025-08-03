import { yupResolver } from "@hookform/resolvers/yup";
import { useGroup, useStudent, useTeacher } from "@hooks";
import type { ModalProps } from "@types";
import { Button, Form, Modal, Select } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  studentId: yup.array().of(yup.number()).optional(),
  teacherId: yup.array().of(yup.number()).optional(),
  groupId: yup.number().required("Group ID is required"),
});

interface ThisProps extends ModalProps {
  addingTeacher: boolean;
  groupId: number;
}

const AddTeacherOrStudentModal = ({
  addingTeacher,
  open,
  toggle,
  groupId,
}: ThisProps) => {
  const { useGroupAddStudent, useGroupAddTeacher } = useGroup({
    page: 1,
    limit: 100,
  });

  const { data: teachersData} = useTeacher({
    page: 1,
    limit: 100,
  });
  const { data: studentsData } = useStudent({ page: 1, limit: 100 });

  const originalData = addingTeacher
    ? teachersData?.data?.data || []
    : studentsData?.data?.data || [];

  const { mutate: addStudent, isPending: isCreatingSt } = useGroupAddStudent();
  const { mutate: addTeacher, isPending: isCreatingTr } = useGroupAddTeacher();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      teacherId: [],
      studentId: [],
      groupId: groupId,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        teacherId: [],
        studentId: [],
        groupId: groupId,
      });
    }
  }, [open, addingTeacher, groupId, reset]);

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      status: true,
      start_date: new Date().toISOString(),
    };

    if (addingTeacher) {
      delete payload.studentId;
      addTeacher(payload, {
        onSuccess: () => {
          toggle();
          reset();
        },
      });
    } else {
      delete payload.teacherId;
      addStudent(payload, {
        onSuccess: () => {
          toggle();
          reset();
        },
      });
    }
  };

  return (
    <Modal
      title={`Add ${addingTeacher ? "Teacher" : "Student"}`}
      centered
      open={open}
      closeIcon
      footer={null}
      width={340}
      onCancel={toggle}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {addingTeacher && (
          <Form.Item label="Teacher" name="teacherId">
            <Controller
              name="teacherId"
              control={control}
              render={({ field }) => (
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select teachers"
                  options={originalData.map((item: any) => ({
                    label: `${item.id} - ${item.first_name} ${item.last_name}`,
                    value: item.id,
                  }))}
                  {...field}
                />
              )}
            />
          </Form.Item>
        )}

        {!addingTeacher && (
          <Form.Item label="Student" name="studentId">
            <Controller
              name="studentId"
              control={control}
              render={({ field }) => (
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select students"
                  options={originalData.map((item: any) => ({
                    label: `${item.id} - ${item.first_name} ${item.last_name}`,
                    value: item.id,
                  }))}
                  {...field}
                />
              )}
            />
          </Form.Item>
        )}

        <Form.Item hidden name="groupId">
          <Controller
            name="groupId"
            control={control}
            render={({ field }) => <input type="hidden" {...field} />}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={addingTeacher ? isCreatingTr : isCreatingSt}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTeacherOrStudentModal;
