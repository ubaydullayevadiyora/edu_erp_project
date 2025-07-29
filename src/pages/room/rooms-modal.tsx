import { useForm, Controller } from "react-hook-form";
import { roomFormSchema } from "@utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useBranch, useRoom } from "@hooks";
import { useEffect } from "react";
import { Button, Form, Input, Modal, InputNumber, Select } from "antd";
import type { ModalProps, Rooms } from "@types";

interface RoomModalProps extends ModalProps {
  update: Rooms | null;
}

const RoomModal = ({ open, toggle, update }: RoomModalProps) => {
  const params = { page: 1, limit: 6 };
  const { useRoomCreate, useRoomUpdate } = useRoom(params);
  const { mutate: createFn, isPending: isCreating } = useRoomCreate();
  const { mutate: updateFn, isPending: isUpdating } = useRoomUpdate();
  const { data } = useBranch({ page: 1, limit: 6 });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(roomFormSchema),
    defaultValues: {
      branchId: 1,
      name: "",
      capacity: 15,
    },
  });

  useEffect(() => {
    if (update?.id) {
      setValue("branchId", update.branchId);
      setValue("name", update.name);
      setValue("capacity", update.capacity);
    } else {
      reset();
    }
  }, [update, setValue, reset]);

  const onSubmit = (data: any) => {
    const payload = { ...data };

    if (update?.id) {
      updateFn({ ...payload, id: update.id });
    } else {
      createFn(payload);
    }
  };

  const getBranchName = (id: number) => {
    return data?.data?.branches?.find((branch: any) => branch.id === id)?.name;
  };

  const branches = data?.data?.branches || [];

  return (
    <Modal
      title="Room Modal"
      centered
      open={open}
      onCancel={toggle}
      width={700}
      footer={null}
    >
      {update?.branchId && (
        <div style={{ marginBottom: 16 }}>
          <strong>Branch:</strong>{" "}
          {getBranchName(update.branchId) || "Not found"}
        </div>
      )}

      <Form
        layout="vertical"
        autoComplete="on"
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item
          label="Branch"
          validateStatus={errors.branchId ? "error" : ""}
          help={errors.branchId?.message}
        >
          <Controller
            name="branchId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                placeholder="Search branch"
                optionFilterProp="label"
                options={branches.map((branch: any) => ({
                  value: branch.id,
                  label: branch.name,
                }))}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Room Name" />}
          />
        </Form.Item>

        <Form.Item
          label="Capacity"
          validateStatus={errors.capacity ? "error" : ""}
          help={errors.capacity?.message}
        >
          <Controller
            name="capacity"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={1}
                max={100}
                style={{ width: "100%" }}
                placeholder="Room Capacity"
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
            {update?.id ? "Update Room" : "Create Room"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoomModal;
