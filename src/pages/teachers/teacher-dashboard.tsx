import { Card, Col, Row, Table, Tag } from "antd";
import { BookOpen, Users, CalendarClock } from "lucide-react";

const TeacherDashboard = () => {
  // Fake stats (buni backenddan olasiz keyin)
  const stats = [
    { icon: <Users />, title: "My Groups", value: 5 },
    { icon: <CalendarClock />, title: "Today's Lessons", value: 3 },
    { icon: <BookOpen />, title: "Students", value: 72 },
  ];

  const lessons = [
    {
      key: 1,
      group: "Frontend N18",
      room: "Room A1",
      time: "10:00 - 11:30",
      status: "in_progress",
    },
    {
      key: 2,
      group: "Backend N17",
      room: "Room B2",
      time: "14:00 - 15:30",
      status: "waiting",
    },
  ];

  const columns = [
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "in_progress" ? "green" : "orange"}>
          {status.replace("_", " ").toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <Row gutter={16}>
        {stats.map((s, idx) => (
          <Col key={idx} xs={24} sm={12} md={8}>
            <Card className="rounded-2xl shadow" bordered={false}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                  {s.icon}
                </div>
                <div>
                  <h4 className="text-sm text-gray-500">{s.title}</h4>
                  <p className="text-xl font-bold">{s.value}</p>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Today's Lessons Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Today's Lessons</h3>
        <Table
          columns={columns}
          dataSource={lessons}
          pagination={false}
          rowKey="key"
        />
      </div>
    </div>
  );
};

export default TeacherDashboard;
