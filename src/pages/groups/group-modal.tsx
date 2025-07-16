import { Modal, Form, Input, Button, Select, DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { ModalProps, Group } from "@types";
import { groupFormSchema } from "@utils";
import dayjs from "dayjs";
import { useCourse, useGroup } from "@hooks";

interface GroupProps extends ModalProps {
  update: Group | null;
}

const GroupModal = ({ open, toggle, update }: GroupProps) => {
  const params = { page: 1, limit: 10 }; 
  const { useGroupCreate, useGroupUpdate } = useGroup(params, update?.id);
  const { mutate: createFn, isPending: isCreating } = useGroupCreate();
  const { mutate: updateFn, isPending: isUpdating } = useGroupUpdate();
  const { data } = useCourse({ page: 1, limit: 6 });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(groupFormSchema),
    defaultValues: {
      name: "",
      status: "",
      course_id: undefined,
      start_date: undefined,
      end_date: undefined,
    },
  });

  useEffect(() => {
    if (update?.id) {
      setValue("name", update.name);
      setValue("status", update.status);
      setValue("course_id", update.course_id);
      if (update.start_date) {
        setValue("start_date", dayjs(update.start_date));
      }
      if (update.end_date) {
        setValue("end_date", dayjs(update.end_date));
      }
    } else {
      reset(); 
    }
  }, [update, setValue, reset]);

  const onSubmit = (data: any) => {
    if (update?.id) {
      updateFn({ ...data, id: update.id });
      console.log("update group", { ...data, id: update.id });
    } else {
      createFn(data);
      console.log("create group", data);
    }
  };

  return (
    <Modal
      title="Group Modal"
      centered
      open={open}
      onCancel={toggle}
      width={700}
      footer={null}
    >
      <Form
        layout="vertical"
        autoComplete="on"
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item
          label="Name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Name" />}
          />
        </Form.Item>

        <Form.Item
          label="Status"
          validateStatus={errors.status ? "error" : ""}
          help={errors.status?.message}
        >
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select status"
                options={[
                  { value: "active", label: "Active" },
                  { value: "new", label: "New" },
                  { value: "completed", label: "Completed" },
                ]}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Courses"
          validateStatus={errors.course_id ? "error" : ""}
          help={errors.course_id?.message}
        >
          <Controller
            name="course_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                placeholder="Search course"
                optionFilterProp="label"
                options={data?.data?.courses.map((course: any) => ({
                  value: course.id,
                  label: course.title,
                }))}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Start Date"
          validateStatus={errors.start_date ? "error" : ""}
          help={errors.start_date?.message}
        >
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="End Date"
          validateStatus={errors.end_date ? "error" : ""}
          help={errors.end_date?.message}
        >
          <Controller
            name="end_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isCreating || isUpdating}
          >
            {update?.id ? "Update Group" : "Create Group"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GroupModal;
