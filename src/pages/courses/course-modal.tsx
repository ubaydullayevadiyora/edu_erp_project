import { Modal, Form, Input, Button, InputNumber } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { ModalProps, Course } from "@types";
import { courseFormSchema } from "@utils";
import { useCourse } from "@hooks";

interface CourseProps extends ModalProps {
  update: Course | null;
}

const CourseModal = ({ open, toggle, update }: CourseProps) => {
  const params = { page: 1, limit: 6 };
  const { useCourseCreate, useCourseUpdate } = useCourse(params); 
  const { mutate: createFn, isPending: isCreating } = useCourseCreate();
  const { mutate: updateFn, isPending: isUpdating } = useCourseUpdate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(courseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      duration: 3,
      lessons_in_a_week: 1,
      lessons_in_a_month: 12,
      lesson_duration: 120,
    },
  });

  useEffect(() => {
    if (update?.id) {
      setValue("title", update.title);
      setValue("description", update.description);
      setValue("price", update.price);
      setValue("duration", update.duration);
      setValue("lessons_in_a_week", update.lessons_in_a_week);
      setValue("lesson_duration", update.lesson_duration);
    } else {
      reset();
    }
  }, [update, setValue, reset]);

  const onSubmit = (data: any) => {
    if (update?.id) {
      updateFn({ ...data, id: update.id });
    } else {
      createFn(data);
    }
  };

  return (
    <Modal
      title="Course Modal"
      centered
      open={open}
      onCancel={toggle}
      width={700}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {/* TITLE */}
        <Form.Item
          label="Title"
          validateStatus={errors.title ? "error" : ""}
          help={errors.title?.message}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Course title" />
            )}
          />
        </Form.Item>
        {/* PRICE */}
        <Form.Item
          label="Price"
          validateStatus={errors.price ? "error" : ""}
          help={errors.price?.message}
        >
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                style={{ width: "100%" }}
                min={0}
                placeholder="Price"
              />
            )}
          />
        </Form.Item>
        {/* DURATION */}
        <Form.Item
          label="Duration (e.g. '3 oy')"
          validateStatus={errors.duration ? "error" : ""}
          help={errors.duration?.message}
        >
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Duration (e.g. '3 oy')" />
            )}
          />
        </Form.Item>
        {/* LESSONs IN A WEEK */}
        <Form.Item
          label="Lessons in a week"
          validateStatus={errors.lessons_in_a_week ? "error" : ""}
          help={errors.lessons_in_a_week?.message}
        >
          <Controller
            name="lessons_in_a_week"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={1}
                max={7}
                style={{ width: "100%" }}
                placeholder="Lessons in a week"
              />
            )}
          />
        </Form.Item>
        {/* LESSONs IN A MONTH */}
        <Form.Item
          label="Lessons in a month"
          validateStatus={errors.lessons_in_a_month ? "error" : ""}
          help={errors.lessons_in_a_month?.message}
        >
          <Controller
            name="lessons_in_a_month"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={1}
                max={7}
                style={{ width: "100%" }}
                placeholder="Lessons in a month"
              />
            )}
          />
        </Form.Item>
        {/* LESSON DURATION */}
        <Form.Item
          label="Lesson duration (e.g. '3 HOUR')"
          validateStatus={errors.lesson_duration ? "error" : ""}
          help={errors.lesson_duration?.message}
        >
          <Controller
            name="lesson_duration"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Lesson duration (e.g. '3 HOUR')" />
            )}
          />
        </Form.Item>
        {/* DESCRIPTION */}
        <Form.Item
          label="Description"
          validateStatus={errors.description ? "error" : ""}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                rows={4}
                placeholder="Course description"
              />
            )}
          />
        </Form.Item>
        {/* BUTTON */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isCreating || isUpdating}
          >
            {update?.id ? "Update Course" : "Create Course"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CourseModal;
