import { Modal, Form, Input, Button, Select, DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { studentFormSchema } from "@utils";
import type { ModalProps, Student } from "@types";
import { useStudent } from "@hooks";
import dayjs from "dayjs";
import { MaskedInput } from "@components";

interface StudentProps extends ModalProps {
  update: Student | null;
}

const StudentModal = ({ open, toggle, update }: StudentProps) => {
  const params = { page: 1, limit: 5 };
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
      date_of_birth:undefined,
    },
  });

  useEffect(() => {
    if (update?.id) {
      setValue("first_name", update.first_name);
      setValue("last_name", update.last_name);
      setValue("email", update.email);
      setValue("phone", update.phone);
      setValue("gender", update.gender);
      if (update.date_of_birth) {
        setValue("date_of_birth", dayjs(update.date_of_birth).toDate())
      }
    } else {
      reset();
    }
  }, [update, setValue, reset]);

  const onSubmit = (data: any) => {
    const payload: any = {
      ...data,
      date_of_birth: dayjs(data.date_of_birth).format("YYYY-MM-DD")
    };

    // CREATE
    if (!update?.id && data.password) {
      payload.password_hash = data.password;
    }

    // DELETE
    delete payload.password;
    delete payload.confirm_password; 

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
            render={({ field }) => <Input {...field} placeholder="Firstname" />}
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
            render={({ field }) => <Input {...field} placeholder="Lastname" />}
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
            render={({ field }) => <Input {...field} placeholder="Email" />}
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
            render={({ field }) => (
              <MaskedInput
                {...field}
                mask="+\9\98 (00) 000-00-00"
                placeholder="Phone number"
              />
            )}
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
              render={({ field }) => (
                <Input.Password {...field} placeholder="Password" />
              )}
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
              render={({ field }) => (
                <Input.Password {...field} placeholder="Confirm Password" />
              )}
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
                placeholder="Gender"
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
                value={field.value ? dayjs(field.value) : null} //added
                format="YYYY-MM-DD"
                style={{ width: "100%" }}
                onChange={(date) => field.onChange(date)}
                placeholder="Date of Birth"
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
