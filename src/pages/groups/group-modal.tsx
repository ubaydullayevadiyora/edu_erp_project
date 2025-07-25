import {
  Modal,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  TimePicker,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { ModalProps, Group } from "@types";
import { groupFormSchema } from "@utils";
import dayjs from "dayjs";
import { useCourse, useGroup, useRoom } from "@hooks";

interface GroupProps extends ModalProps {
  update: Group | null;
}

const GroupModal = ({ open, toggle, update }: GroupProps) => {
  const params = { page: 1, limit: 6 };
  console.log(update);
  
  const { useGroupCreate, useGroupUpdate } = useGroup(params, update?.id);
  const { mutate: createFn, isPending: isCreating } = useGroupCreate();
  const { mutate: updateFn, isPending: isUpdating } = useGroupUpdate();
  const { data: courseData } = useCourse({ page: 1, limit: 6 });
  const { data: roomData } = useRoom({ page: 1, limit: 6 });

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
      courseId: undefined,
      start_date: "",
      start_time: "",
      roomId: undefined,
    },
  });

  useEffect(() => {
    const coursesLoaded = courseData?.data?.courses?.length;
    const roomsLoaded = roomData?.data?.rooms?.length;

    if (update?.id && coursesLoaded && roomsLoaded) {
      setValue("name", update.name);
      setValue("status", update.status);
      setValue("courseId", update?.course?.id);
      setValue("roomId", update.room?.id);

      if (update.start_date) {
        setValue("start_date", dayjs(update.start_date));
      }

      if (update.start_time) {
        setValue("start_time", dayjs(update.start_time).format("HH:mm"));
      }
    } else if (!update?.id) {
      reset();
    }
  }, [update, courseData, roomData, setValue, reset]);


  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      start_date: dayjs(data.start_date).format("YYYY-MM-DD"),
      start_time: data.start_time,
    };

    if (update?.id) {
      updateFn({ ...payload, id: update.id });
    } else {
      createFn(payload);
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
          label="Course"
          validateStatus={errors.courseId ? "error" : ""}
          help={errors.courseId?.message}
        >
          <Controller
            name="courseId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                placeholder="Select course"
                optionFilterProp="label"
                options={courseData?.data?.courses.map((course: any) => ({
                  value: course.id,
                  label: course.title,
                }))}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Room"
          validateStatus={errors.roomId ? "error" : ""}
          help={errors.roomId?.message}
        >
          <Controller
            name="roomId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                placeholder="Select room"
                optionFilterProp="label"
                options={
                  roomData?.data?.rooms.map((room: any) => ({
                    value: room.id,
                    label: room.name,
                  })) || []
                }
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
          label="Start Time"
          validateStatus={errors.start_time ? "error" : ""}
          help={errors.start_time?.message}
        >
          <Controller
            name="start_time"
            control={control}
            render={({ field }) => (
              <TimePicker
                format="HH:mm"
                style={{ width: "100%" }}
                value={field.value ? dayjs(field.value, "HH:mm") : null}
                onChange={(time) =>
                  field.onChange(time ? time.format("HH:mm") : "")
                }
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
