import { useEffect, useState } from "react";
import { groupService } from "../../service";
import {
  Space,
  Table,
  Button,
  DatePicker,
  Select,
  Form,
  message,
  Modal,
  Input,
  Popconfirm,
} from "antd";
import type { Group } from "../../types";
import type { Course } from "../../types/courses";
import dayjs from "dayjs";

const { Column } = Table;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  const fetchGroups = async () => {
    try {
      const response = await groupService.getGroups();
      setGroups(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await groupService.getCourses();
      setCourses(response?.data?.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
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
        console.log("UPDATE group id:", editingGroup.id); 
        await groupService.updateGroup(editingGroup.id, payload);
      } else {
        await groupService.createGroup(payload);
      }

      fetchGroups();
      setIsModalOpen(false);
      setEditingGroup(null);
      form.resetFields();
    } catch (error) {
      console.error("Error:", error);
      message.error("Xatolik yuz berdi");
    }
  };
  

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingGroup(null);
    form.resetFields();
  };

  const handleDelete = async (id: number) => {
    try {
      await groupService.deleteGroup(id);
      fetchGroups();
    } catch (error) {
      console.error("Error deleting group:", error);
      message.error("O'chirishda xatolik yuz berdi");
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setEditingGroup(null);
          setIsModalOpen(true);
        }}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        Yangi group yaratish
      </Button>

      <Table<Group>
        dataSource={groups}
        rowKey="id"
        pagination={{ pageSize: 6 }}
      >
        <Column title="Group Name" dataIndex="name" key="name" />
        <Column title="Status" dataIndex="status" key="status" />
        <Column title="Start Date" dataIndex="start_date" key="start_date" />
        <Column title="End Date" dataIndex="end_date" key="end_date" />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: Group) => (
            <Space size="middle">
              <a
                onClick={() => {
                  console.log("Edit bosildi, group id:", record.id);
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
        onCancel={handleCancel}
        okText="Saqlash"
        cancelText="Bekor qilish"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Group nomi"
            rules={[{ required: true, message: "Group nomi majburiy" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="course_id"
            label="Kurs"
            rules={[{ required: true, message: "Kursni tanlang" }]}
          >
            <Select placeholder="Kursni tanlang" loading={courses.length === 0}>
              {courses.map((course) => (
                <Option key={course.id} value={course.id}>
                  {course.title}{" "}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Holati"
            rules={[{ required: true, message: "Statusni tanlang" }]}
          >
            <Select placeholder="Status tanlang">
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
            rules={[{ required: true, message: "Sanani tanlang" }]}
          >
            <RangePicker format="YYYY-MM-DD" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Groups;
