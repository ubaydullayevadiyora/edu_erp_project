import { Modal, Form, Input, Button, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { ModalProps, Teacher } from "@types";
import { teacherFormSchema } from "@utils";
import { useBranch, useTeacher } from "@hooks";
import { MaskedInput } from "@components";

interface TeacherProps extends ModalProps {
  update: Teacher | null;
}

const TeacherModal = ({ open, toggle, update }: TeacherProps) => {
  const params = { page: 1, limit: 5 };
  const { useTeacherCreate, useTeacherUpdate } = useTeacher(params);
  const { mutate: createFn, isPending: isCreating } = useTeacherCreate();
  const { mutate: updateFn, isPending: isUpdating } = useTeacherUpdate();
  const { data } = useBranch({ page: 1, limit: 5 });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(teacherFormSchema),
    context: { isUpdate: !update?.id },
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "",
      role: "teacher",
      branchId: undefined,
    },
  });

  useEffect(() => {
    if (update?.id) {
      setValue("first_name", update.first_name);
      setValue("last_name", update.last_name);
      setValue("email", update.email);
      setValue("phone", update.phone);
      setValue("role", update.role);
      const branchIds = update.branches?.map((branch: any) => branch.id) || [];
      setValue("branchId", branchIds);
    } else {
      reset();
    }
  }, [update, setValue, reset]);

  const onSubmit = (data: any) => {
    const payload: any = {
      ...data,
    };

    if (update?.id) {
      updateFn({ ...payload, id: update.id });
    } else {
      createFn(payload);
    }
  };

  return (
    <Modal
      title="Teacher Modal"
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
          label="First Name"
          validateStatus={errors.first_name ? "error" : ""}
          help={errors.first_name?.message}
        >
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="First name" />
            )}
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
            render={({ field }) => <Input {...field} placeholder="Last name" />}
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

        <Form.Item
          label="Role"
          validateStatus={errors.role ? "error" : ""}
          help={errors.role?.message}
        >
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select role"
                options={[
                  { value: "main teacher", label: "Main Teacher" },
                  { value: "assistant teacher", label: "Assistant Teacher" },
                  { value: "admin", label: "Admin" },
                ]}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Branches"
          validateStatus={errors.branchId ? "error" : ""}
          help={errors.branchId?.message}
        >
          <Controller
            name="branchId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                mode="multiple"
                showSearch
                placeholder="Search branch"
                optionFilterProp="label"
                options={(data?.data?.branch ?? []).map((branch: any) => ({
                  value: branch.id,
                  label: branch.name,
                }))}
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
            {update?.id ? "Update Teacher" : "Create Teacher"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TeacherModal;
