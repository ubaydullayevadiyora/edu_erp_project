import { Modal, Input, Button, Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { ModalProps, Branch } from "@types";
import { branchFormSchema } from "@utils";
import { useBranch } from "@hooks";
import { MaskedInput } from "../../components";

interface BranchProps extends ModalProps {
  update: Branch | null;
}

const BranchModal = ({ open, toggle, update }: BranchProps) => {
  const params = { page: 1, limit: 5 };
  const { useBranchCreate, useBranchUpdate } = useBranch(params);
  const { mutate: createFn, isPending: isCreating } = useBranchCreate();
  const { mutate: updateFn, isPending: isUpdating } = useBranchUpdate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(branchFormSchema),
    defaultValues: {
      name: "",
      address: "",
      call_number: "",
    },
  });

  useEffect(() => {
    if (update?.id) {
      setValue("name", update.name);
      setValue("address", update.address);
      setValue("call_number", update.call_number);
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
      title={update?.id ? "Update Branch" : "Create Branch"}
      centered
      open={open}
      onCancel={toggle}
      width={700}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Branch name" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Address"
          validateStatus={errors.address ? "error" : ""}
          help={errors.address?.message}
        >
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Branch address" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Call number"
          validateStatus={errors.call_number ? "error" : ""}
          help={errors.call_number?.message}
        >
          <Controller
            name="call_number"
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isCreating || isUpdating}
            block
          >
            {update?.id ? "Update Branch" : "Create Branch"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BranchModal;
