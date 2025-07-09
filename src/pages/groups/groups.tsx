import {
  Table,
  Button,
  Form,
  Modal,
  Input,
  Select,
  message,
  DatePicker,
  Space,
  Popconfirm,
} from "antd";
import { useEffect, useState } from "react";
import { useGroup } from "../../hooks/useGroup";
import { groupService } from "../../service";
import type { Group } from "../../types";
import type { Course } from "../../types/courses";
import dayjs from "dayjs";

const { Column } = Table;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Groups = () => {
  const { data, useGroupCreate, useGroupUpdate, useGroupDelete } = useGroup();
  const { mutate: createGroup, isPending } = useGroupCreate();
  const { mutate: updateGroup } = useGroupUpdate();
  const { mutate: deleteGroup } = useGroupDelete();

  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  const fetchCourses = async () => {
    try {
      const res = await groupService.getCourses();
      setCourses(res?.data?.courses || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const [startDate, endDate] = values.dates;

      const payload: Omit<Group, "id"> = {
        name: values.name,
        course_id: parseInt(values.course_id),
        status: values.status,
        start_date: dayjs(startDate).format("YYYY-MM-DD"),
        end_date: dayjs(endDate).format("YYYY-MM-DD"),
      };

      if (editingGroup?.id) {
        updateGroup(
          { id: editingGroup.id, ...payload },
          {
            onSuccess: () => {
              setIsModalOpen(false);
              setEditingGroup(null);
              form.resetFields();
            },
            onError: () => message.error("Tahrirlashda xatolik"),
          }
        );
      } else {
        createGroup(payload, {
          onSuccess: () => {
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
    deleteGroup(id, {
      onSuccess: () => {
      },
      onError: () => {
        message.error("O'chirishda xatolik yuz berdi");
      },
    });
  };

  return (
    <>
      <Button
        onClick={() => {
          setEditingGroup(null);
          form.resetFields();
          setIsModalOpen(true);
        }}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        Yangi group yaratish
      </Button>

      <Table<Group>
        dataSource={data?.data?.data || []}
        loading={isPending}
        rowKey="id"
      >
        <Column title="Group Name" dataIndex="name" key="name" />
        <Column title="Status" dataIndex="status" key="status" />
        <Column title="Start Date" dataIndex="start_date" key="start_date" />
        <Column title="End Date" dataIndex="end_date" key="end_date" />
        <Column
          title="Action"
          key="action"
          render={(_, record: Group) => (
            <Space size="middle">
              <a
                onClick={() => {
                  setEditingGroup(record);
                  form.setFieldsValue({
                    name: record.name,
                    course_id: record.course_id,
                    status: record.status,
                    dates: [dayjs(record.start_date), dayjs(record.end_date)],
                  });
                  setIsModalOpen(true);
                }}
              >
                Edit
              </a>
              <Popconfirm
                title="Bu group o'chirilsinmi?"
                onConfirm={() => handleDelete(record.id)}
                okText="Ha"
                cancelText="Yo'q"
              >
                <a style={{ color: "red" }}>Delete</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>

      <Modal
        title={editingGroup ? "Groupni tahrirlash" : "Yangi Group yaratish"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingGroup(null);
        }}
        okText="Saqlash"
        cancelText="Bekor qilish"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Group nomi"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="course_id" label="Kurs" rules={[{ required: true }]}>
            <Select placeholder="Kurs tanlang">
              {courses.map((course) => (
                <Option key={course.id} value={course.id}>
                  {course.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Holat" rules={[{ required: true }]}>
            <Select>
              <Option value="new">New</Option>
              <Option value="active">Active</Option>
              <Option value="cancelled">Cancelled</Option>
              <Option value="pending">Pending</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dates"
            label="Boshlanish va tugash sanasi"
            rules={[{ required: true }]}
          >
            <RangePicker format="YYYY-MM-DD" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Groups;
