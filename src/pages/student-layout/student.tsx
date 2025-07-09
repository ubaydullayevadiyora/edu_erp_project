import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  message,
} from "antd";
import { useState } from "react";
import type { Student } from "../../types/student";
import { useStudent } from "../../hooks/useStudent";
import Column from "antd/es/table/Column";

const StudentLayout = () => {
  const {
    data,
    isLoading,
    useStudentCreate,
    useStudentUpdate,
    useStudentDelete,
  } = useStudent();

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
        gender: values.gender,
        date_of_birth: values.date_of_birth,
      };

      // Faqat create paytida password_hash kiritiladi
      if (!editingStudent) {
        payload.password_hash = values.password_hash;
      }

      if (editingStudent?.id) {
        updateStudent(
          { id: editingStudent.id, ...payload },
          {
            onSuccess: () => {
              message.success("O'quvchi tahrirlandi");
              setIsModalOpen(false);
              setEditingStudent(null);
              form.resetFields();
            },
            onError: () => message.error("Tahrirlashda xatolik"),
          }
        );
      } else {
        createStudent(payload, {
          onSuccess: () => {
            message.success("Yangi o'quvchi qo'shildi");
            setIsModalOpen(false);
            form.resetFields();
          },
          onError: () => message.error("Yaratishda xatolik"),
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id: number) => {
    deleteStudent(id, {
      onSuccess: () => message.success("O'quvchi o'chirildi"),
      onError: () => message.error("O'chirishda xatolik"),
    });
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
        Yangi O'quvchi qo'shish
      </Button>

      <Table<Student>
        dataSource={data?.data?.students || []}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 6 }}
      >
        <Column title="Ism" dataIndex="first_name" key="first_name" />
        <Column title="Familiya" dataIndex="last_name" key="last_name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Telefon" dataIndex="phone" key="phone" />
        <Column title="Jinsi" dataIndex="gender" key="gender" />
        <Column
          title="Tug'ilgan sana"
          dataIndex="date_of_birth"
          key="date_of_birth"
        />
        <Column
          title="Amallar"
          key="action"
          render={(_, record: Student) => (
            <Space size="middle">
              <a
                onClick={() => {
                  setEditingStudent(record);
                  form.setFieldsValue(record);
                  setIsModalOpen(true);
                }}
              >
                Tahrirlash
              </a>
              <Popconfirm
                title="Bu o'quvchini o'chirmoqchimisiz?"
                onConfirm={() => handleDelete(record.id)}
                okText="Ha"
                cancelText="Yo'q"
              >
                <a style={{ color: "red" }}>O'chirish</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>

      <Modal
        title={
          editingStudent
            ? "O'quvchi ma'lumotlarini tahrirlash"
            : "Yangi o'quvchi yaratish"
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingStudent(null);
        }}
        okText="Saqlash"
        cancelText="Bekor qilish"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="first_name"
            label="Ism"
            rules={[{ required: true, message: "Ism majburiy" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="last_name"
            label="Familiya"
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
            label="Telefon"
            rules={[{ required: true, message: "Telefon raqam majburiy" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Jinsi"
            rules={[{ required: true, message: "Jins majburiy" }]}
          >
            <Select>
              <Select.Option value="male">Erkak</Select.Option>
              <Select.Option value="female">Ayol</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="date_of_birth"
            label="Tug'ilgan sana"
            rules={[{ required: true, message: "Tug'ilgan sana majburiy" }]}
          >
            <Input placeholder="2005-06-15 kabi yozing" />
          </Form.Item>

          {/* Faqat create paytida password kiritiladi */}
          {!editingStudent && (
            <Form.Item
              name="password_hash"
              label="Parol"
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
