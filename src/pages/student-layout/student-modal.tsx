import { Modal, Form, Input, Button, Select, DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { studentFormSchema } from "@utils";
import type { ModalProps, Student } from "@types";
import { useStudent } from "@hooks";
import dayjs from "dayjs";

interface StudentProps extends ModalProps {
  update: Student | null;
}

const StudentModal = ({ open, toggle, update }: StudentProps) => {
  const params = { page: 1, limit: 6 };
  const { useStudentCreate, useStudentUpdate } = useStudent(params);
  const { mutate: createFn, isPending: isCreating } = useStudentCreate();
  const { mutate: updateFn, isPending: isUpdating } = useStudentUpdate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(studentFormSchema),
    context: { isCreate: !update?.id },
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
      gender: "male",
      date_of_birth: undefined,
    },
  });


  useEffect(() => {
    if (update?.id) {
      setValue("first_name", update.first_name);
      setValue("last_name", update.last_name);
      setValue("email", update.email);
      setValue("phone", update.phone);
      setValue("gender", update.gender);
      setValue(
        "date_of_birth",
        update.date_of_birth ? dayjs(update.date_of_birth) : null
      );
    } else {
      reset();
    }
  }, [update, setValue, reset]);

  const onSubmit = (data: any) => {
    const payload: any = {
      ...data,
      date_of_birth: dayjs.isDayjs(data.date_of_birth)
        ? data.date_of_birth.toDate()
        : data.date_of_birth ?? null,
    };

    // CREATE: parolni qo‘shamiz
    if (!update?.id && data.password) {
      payload.password_hash = data.password;
    }

    // DELETE: keraksiz fieldlar
    delete payload.password;
    delete payload.confirm_password; // BU MUHIM!

    if (update?.id) {
      updateFn({ ...payload, id: update.id });
    } else {
      createFn(payload);
    }
  };

  
  return (
    <Modal
      title="Student Modal"
      centered
      open={open}
      onCancel={toggle}
      width={700}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="First Name"
          validateStatus={errors.first_name ? "error" : ""}
          help={errors.first_name?.message}
        >
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Last Name"
          validateStatus={errors.last_name ? "error" : ""}
          help={errors.last_name?.message}
        >
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Phone"
          validateStatus={errors.phone ? "error" : ""}
          help={errors.phone?.message}
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        {!update?.id && (
          <Form.Item
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>
        )}

        {!update?.id && (
          <Form.Item
            label="Confirm Password"
            validateStatus={errors.confirm_password ? "error" : ""}
            help={errors.confirm_password?.message}
          >
            <Controller
              name="confirm_password"
              control={control}
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>
        )}

        <Form.Item
          label="Gender"
          validateStatus={errors.gender ? "error" : ""}
          help={errors.gender?.message}
        >
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          validateStatus={errors.date_of_birth ? "error" : ""}
          help={errors.date_of_birth?.message as string}
        >
          <Controller
            control={control}
            name="date_of_birth"
            render={({ field }) => (
              <DatePicker
                {...field}
                format="YYYY-MM-DD"
                style={{ width: "100%" }}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date?.toDate())}
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
            {update?.id ? "Update Student" : "Create Student"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudentModal;
