import { yupResolver } from "@hookform/resolvers/yup";
import { useLessons } from "@hooks";
import { useQueryClient } from "@tanstack/react-query";
import type { Lessons, ModalProps } from "@types";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  notes: yup
    .string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  status: yup.string().required("Status is required"),
  date: yup
    .mixed()
    .test("is-date", "Start date is required", (value) => {
      return (
        value instanceof dayjs ||
        (typeof value === "string" && dayjs(value).isValid())
      );
    })
    .required("Start date is required"),
});

interface LessonProps extends ModalProps {
  update: Lessons | null;
}

const LessonModal = ({ open, toggle, update }: LessonProps) => {
  const queryClient = useQueryClient();
  const { useLessonUpdateStatusAndNotes } = useLessons({});
  const { mutate: updateLessonStatusAndNote, isPending: isUpdating } =
    useLessonUpdateStatusAndNotes();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (update?.id) {
      setValue("notes", update.notes);
      setValue("status", update.status);
      setValue("date", dayjs(update.date));
    }
  }, [update]);

  const onSubmit = (data: any) => {
    const updateItem = {
      note: data.notes,
      status: data.status,
      date: dayjs(data.date).format("YYYY-MM-DD"),
    };

    if (update?.id) {
      if (
        data.status === "cancelled" ||
        data.status === "completed" ||
        data.status === "in_progress"
      ) {
        (updateItem as { date?: string }).date = undefined;
      }

      updateLessonStatusAndNote(
        { id: update.id, data: updateItem },
        {
          onSuccess: () => {
            toggle();
            queryClient.invalidateQueries({
              queryKey: ["lessons", update.id],
            });
          },
        }
      );
    }
  };

  return (
    <Modal
      title="Lesson Modal"
      centered
      open={open}
      onCancel={toggle}
      width={600}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Notes"
          name="notes"
          validateStatus={errors.notes ? "error" : ""}
          help={errors.notes?.message}
        >
          <Controller
            name={"notes"}
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name={"status"}
          validateStatus={errors.status ? "error" : ""}
          help={errors.status?.message}
        >
          <Controller
            name={"status"}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { label: "New", value: "new" },
                  { label: "Canceled", value: "cancelled" },
                  { label: "Completed", value: "completed" },
                  { label: "In Progress", value: "in_progress" },
                ]}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          validateStatus={errors.date ? "error" : ""}
          help={errors.date?.message}
        >
          <Controller
            name={"date"}
            control={control}
            render={({ field }) => <DatePicker {...field} />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isUpdating}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LessonModal;
