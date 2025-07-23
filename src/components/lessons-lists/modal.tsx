import { Modal, Form, Input, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import type { Lessons } from "@types";

const { TextArea } = Input;

const LessonModal = ({
  open,
  onClose,
  lesson,
}: {
  open: boolean;
  onClose: () => void;
  lesson: Lessons | null;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: lesson?.status || "",
      note: lesson?.notes || "",
    },
  });

  const onSubmit = (values: any) => {
    console.log("Updated:", values);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      title="Update Lesson"
    >
      <Form layout="vertical">
        <Form.Item
          label="Status"
          validateStatus={errors.status ? "error" : ""}
          help={errors.status?.message}
        >
          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <Select {...field} placeholder="Select status">
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
                <Select.Option value="pending">Pending</Select.Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item
          label="Note"
          validateStatus={errors.note ? "error" : ""}
          help={errors.note?.message}
        >
          <Controller
            name="note"
            control={control}
            rules={{ required: "Note is required" }}
            render={({ field }) => <TextArea {...field} rows={4} />}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LessonModal;
