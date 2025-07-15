import { Modal, Form, Input, Button, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { ModalProps, Group } from "@types";
import { groupFormSchema } from "@utils";
import { useCourse } from "@hooks";
interface GroupProps extends ModalProps {
  update: Group | null;
}
const GroupModal = ({ open, toggle, update }: GroupProps) => {
  //  const { mutate: createFn, isPending: isCreating } = useGroupCreate();
  // const { mutate: updateFn, isPending: isUpdating } = useGroupUpdate();
  const { data } = useCourse({ page: 1, limit: 10 });
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(groupFormSchema),
    defaultValues: {
      name: "",
      status: "",
      course_id: undefined,
    },
  });
  useEffect(() => {
    if (update?.id) {
      setValue("name", update.name);
      setValue("status", update.status);
      setValue("course_id", update.course_id);
    }
  }, [update, setValue]);
  const onSubmit = (data: any) => {
    if (update?.id) {
      // updateFn({...data, id: update.id});
      console.log("Update Group", { ...data, id: update.id });
    } else {
      // createFn(data);
      console.log("Create Group", data);
    }
  };
  return (
    <Modal
      title="Group Modal"
      centered
      open={open}
      onCancel={toggle}
      width={700}
      closeIcon
      footer={null}
    >
      <Form
        layout="vertical"
        autoComplete="on"
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item
          label="Name"
          name="name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name ? errors.name.message : ""}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                status={errors.name ? "error" : ""}
                placeholder="Name"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          validateStatus={errors.status ? "error" : ""}
          help={errors.status ? errors.status.message : ""}
        >
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select status"
                status={errors.status ? "error" : ""}
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
          name="course_id"
          validateStatus={errors.status ? "error" : ""}
          help={errors.status ? errors.status.message : ""}
        >
          <Controller
            name="course_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                status={errors.status ? "error" : ""}
                placeholder="Search to Select"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={data?.data?.courses.map((course: any) => {
                  return {
                    value: course.id,
                    label: course.title,
                  };
                })}
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GroupModal;
