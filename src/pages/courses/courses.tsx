import { useEffect, useState } from "react";
import {
  Space,
  Table,
  Button,
  Form,
  Modal,
  Input,
  Popconfirm,
  InputNumber,
  Select,
  } from "antd";
import type { Course } from "../../types/courses";
import { courseService } from "../../service/courses.service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Column } = Table;

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const fetchCourses = async () => {
    try {
      const response = await courseService.getCourses();
      setCourses(response?.data?.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        title: values.title,
        description: values.description,
        price: values.price,
        duration: values.duration,
        lessons_in_a_week: values.lessons_in_a_week,
        lesson_duration: values.lesson_duration,
      };

      if (editingCourse?.id) {
        await courseService.updateCourse(editingCourse.id, payload);
      } else {
        await courseService.createCourse(payload);
      }

      fetchCourses();
      setIsModalOpen(false);
      setEditingCourse(null);
      form.resetFields();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
    form.resetFields();
  };

  const handleDelete = async (id: number) => {
    try {
      await courseService.deleteCourse(id);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setEditingCourse(null);
          setIsModalOpen(true);
        }}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        add new course
      </Button>

      <Table<Course>
        dataSource={courses}
        rowKey="id"
        pagination={{ pageSize: 6 }}
      >
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="Price ($)" dataIndex="price" key="price" />
        <Column title="Duration" dataIndex="duration" key="duration" />
        <Column
          title="Lessons/week"
          dataIndex="lessons_in_a_week"
          key="lessons_in_a_week"
        />
        <Column
          title="Lesson Duration"
          dataIndex="lesson_duration"
          key="lesson_duration"
        />
        <Column
          title="Created"
          dataIndex="created_at"
          key="created_at"
          render={(date: string) => new Date(date).toLocaleString()}
        />
        <Column
          title="Updated"
          dataIndex="updated_at"
          key="updated_at"
          render={(date: string) => new Date(date).toLocaleString()}
        />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: Course) => (
            <Space size="middle">
              <a
                onClick={() => {
                  setEditingCourse(record);
                  form.setFieldsValue({
                    title: record.title,
                    description: record.description,
                    price: record.price,
                    duration: record.duration,
                    lessons_in_a_week: record.lessons_in_a_week,
                    lesson_duration: record.lesson_duration,
                  });
                  setIsModalOpen(true);
                }}
              >
                <EditOutlined />
              </a>
              <Popconfirm
                title="Are you sure you want to delete this course?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <a style={{ color: "red" }}>
                  <DeleteOutlined />
                </a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>

      <Modal
        title={editingCourse ? "Editing course" : "add new course"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Course name"
            rules={[{ required: true, message: "Course nomi majburiy" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Tavsif majburiy" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price($)"
            rules={[{ required: true, message: "Narx majburiy" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Duration (month)"
            rules={[{ required: true, message: "Davomiylik majburiy" }]}
          >
            <Select placeholder="select duration">
              {[2, 4, 6, 8].map((oy) => (
                <Select.Option key={oy} value={oy}>
                  {oy} month
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="lessons_in_a_week"
            label="lesson in a week"
            rules={[{ required: true, message: "Son majburiy" }]}
          >
            <Select placeholder="Select">
              {[3, 5, 7].map((son) => (
                <Select.Option key={son} value={son}>
                  {son} times
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="lesson_duration"
            label="Lesson duration"
            rules={[{ required: true, message: "Dars davomiyligi majburiy" }]}
          >
            <Select placeholder="Select lesson duration">
              {[120, 240].map((min) => (
                <Select.Option key={min} value={min}>
                  {min / 60} hour
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Courses;
