import { Modal, Form, Select, Button, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as yup from "yup";
import axios from "axios";
import { useTeacher, useStudent } from "@hooks";
import type {
  GroupTeachersType,
  GroupStudentsType,
  Teacher,
  Student,
} from "@types";
import { useEffect } from "react";

const schema = yup.object({
  memberId: yup.number().required("Please select a member"),
});

type MemberType = "teacher" | "student";

interface Props {
  open: boolean;
  onClose: () => void;
  groupId: number;
  type: MemberType;
  groupMembers: GroupTeachersType | GroupStudentsType;
}

const AddMemberModal = ({
  open,
  onClose,
  groupId,
  type,
  groupMembers,
}: Props) => {
  const queryClient = useQueryClient();

  const isTeacher = type === "teacher";

  const { data: teachersData } = useTeacher({ page: 1, limit: 100 });
  const { data: studentsData } = useStudent({ page: 1, limit: 100 });

  const memberIds = (
    isTeacher
      ? (groupMembers as GroupTeachersType).teachers
      : (groupMembers as GroupStudentsType).students
  ).map((m) => m.id);

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { memberId: undefined },
  });

  const { mutate: addMember, isPending } = useMutation({
    mutationFn: async (memberId: number) => {
      const endpoint = isTeacher ? "/group-teachers" : "/group-students";
      const key = isTeacher ? "teacher_id" : "student_id";
      return await axios.post(endpoint, {
        group_id: groupId,
        [key]: memberId,
      });
    },
    onSuccess: () => {
      message.success(`${isTeacher ? "Teacher" : "Student"} added`);
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
      onClose();
      reset();
    },
    onError: () => {
      message.error("Failed to add member");
    },
  });

  useEffect(() => {
    if (open) reset();
  }, [open]);

  const members: (Teacher | Student)[] = isTeacher
    ? teachersData?.data?.data || []
    : studentsData?.data?.data || [];

  const availableMembers = members.filter((m) => !memberIds.includes(m.id));

  return (
    <Modal
      title={`Add ${isTeacher ? "Teacher" : "Student"}`}
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit((data) => addMember(data.memberId))}
      >
        <Form.Item
          label={`Select ${isTeacher ? "teacher" : "student"}`}
          name="memberId"
        >
          <Controller
            name="memberId"
            control={control}
            render={({ field }) => (
              <Select
                placeholder={`Choose a ${isTeacher ? "teacher" : "student"}`}
                style={{ width: "100%" }}
                onChange={field.onChange}
                value={field.value}
                options={availableMembers.map((m) => ({
                  label: `${m.first_name} ${m.last_name}`,
                  value: m.id,
                }))}
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            disabled={availableMembers.length === 0}
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMemberModal;
