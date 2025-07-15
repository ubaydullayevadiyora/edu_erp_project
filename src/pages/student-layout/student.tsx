import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  DatePicker,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import Column from "antd/es/table/Column";
import dayjs from "dayjs";
import { useState } from "react";
import type { Student } from "@types";
import { useStudent } from "@hooks";
import PopConfirm from "../../components/pop-confirm";
import { usePagination } from "../../hooks/usePagination";

const StudentLayout = () => {
  const { current, pageSize, pagination } = usePagination();
  const {
    data,
    isLoading,
    useStudentCreate,
    useStudentUpdate,
    useStudentDelete,
  } = useStudent({ page: current, limit: pageSize });

  const total = data?.data?.total || 0;

  const { mutate: createStudent } = useStudentCreate();
  const { mutate: updateStudent } = useStudentUpdate();
  const { mutate: deleteStudent } = useStudentDelete();

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const payload: Omit<Student, "id"> & { password_hash?: string } = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        gender: values.gender,
        date_of_birth: values.date_of_birth.format("YYYY-MM-DD"),
      };

      if (!editingStudent) {
        payload.password = values.password;
      }

      if (editingStudent?.id) {
        updateStudent(
          { id: editingStudent.id, ...payload },
          {
            onSuccess: () => {
              setIsModalOpen(false);
              setEditingStudent(null);
              form.resetFields();
            },
          }
        );
      } else {
        createStudent(payload, {
          onSuccess: () => {
            setIsModalOpen(false);
            form.resetFields();
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id: number) => {
    deleteStudent(id);
  };

  return (
    <>
      <Button
        onClick={() => {
          setEditingStudent(null);
          form.resetFields();
          setIsModalOpen(true);
        }}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        add new student
      </Button>

      <Table<Student>
        dataSource={data?.data?.students || []}
        rowKey="id"
        loading={isLoading}
        pagination={{ ...pagination, total }}
      >
        <Column title="Firstname" dataIndex="first_name" key="first_name" />
        <Column title="Lastname" dataIndex="last_name" key="last_name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Phone Number" dataIndex="phone" key="phone" />
        <Column title="Gender" dataIndex="gender" key="gender" />
        <Column
          title="Date of Birth"
          dataIndex="date_of_birth"
          key="date_of_birth"
        />
        <Column
          title="Action"
          key="action"
          render={(_, record: Student) => (
            <Space size="middle">
              <a
                onClick={() => {
                  setEditingStudent(record);
                  form.setFieldsValue({
                    ...record,
                    date_of_birth: dayjs(record.date_of_birth),
                  });
                  setIsModalOpen(true);
                }}
              >
                <EditOutlined />
              </a>
              <PopConfirm
                handleDelete={() => handleDelete(record.id)}
                loading={isLoading}
              />
            </Space>
          )}
        />
      </Table>

      <Modal
        title={editingStudent ? "edit student" : "add student"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingStudent(null);
        }}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="first_name"
            label="Firstname"
            rules={[{ required: true, message: "Ism majburiy" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="last_name"
            label="Lastname"
            rules={[{ required: true, message: "Familiya majburiy" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Email majburiy" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: "Telefon raqam majburiy" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Jins majburiy" }]}
          >
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="date_of_birth"
            label="Date of Birth"
            rules={[{ required: true, message: "Tug'ilgan sana majburiy" }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              style={{ width: "100%" }}
              placeholder="Sana tanlang"
            />
          </Form.Item>

          {!editingStudent && (
            <Form.Item
              name="password_hash"
              label="Password"
              rules={[{ required: true, message: "Parol majburiy" }]}
            >
              <Input.Password />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default StudentLayout;
