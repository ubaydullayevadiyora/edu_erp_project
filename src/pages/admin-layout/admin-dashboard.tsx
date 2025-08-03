import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  UserOutlined,
  TeamOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Card, Row, Col } from "antd";

// Statistika kartochkalari
const stats = [
  {
    title: "Total Students",
    value: 245,
    icon: <UserOutlined className="text-blue-600 text-xl" />,
    bg: "bg-blue-100",
  },
  {
    title: "Total Teachers",
    value: 38,
    icon: <TeamOutlined className="text-green-600 text-xl" />,
    bg: "bg-green-100",
  },
  {
    title: "Active Groups",
    value: 18,
    icon: <PieChartOutlined className="text-purple-600 text-xl" />,
    bg: "bg-purple-100",
  },
];

// Grafik uchun data
const barData = [
  { name: "Jan", students: 200, teachers: 30 },
  { name: "Feb", students: 230, teachers: 28 },
  { name: "Mar", students: 210, teachers: 35 },
  { name: "Apr", students: 250, teachers: 38 },
];

// Eventlar
const upcomingEvents = [
  { time: "09:00 AM", title: "Math Olympiad" },
  { time: "11:30 AM", title: "Science Lab Practice" },
  { time: "02:00 PM", title: "Staff Meeting" },
  { time: "04:00 PM", title: "Graduation Rehearsal" },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen">
      {/* Statistic Cards */}
      <Row gutter={[16, 16]}>
        {stats.map((item) => (
          <Col span={24} md={8} key={item.title}>
            <Card
              className={`rounded-2xl ${item.bg} shadow-md border-0 transition-transform hover:scale-[1.02]`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-white shadow text-xl text-gray-700">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm text-gray-600">{item.title}</h4>
                  <p className="text-2xl font-bold text-gray-800">
                    {item.value}
                  </p>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main Content */}
      <Row gutter={[16, 16]}>
        {/* Chart */}
        <Col span={24} md={14}>
          <Card
            title={
              <span className="font-semibold text-lg text-gray-800">
                📊 Monthly Overview
              </span>
            }
            className="rounded-2xl shadow-sm"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="students"
                  stackId="a"
                  fill="#60A5FA"
                  name="Students"
                />
                <Bar
                  dataKey="teachers"
                  stackId="a"
                  fill="#34D399"
                  name="Teachers"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Upcoming Events */}
        <Col span={24} md={10}>
          <Card
            title={
              <span className="font-semibold text-lg text-gray-800">
                📅 Upcoming Events
              </span>
            }
            className="rounded-2xl shadow-sm bg-yellow-50"
          >
            <ul className="space-y-4 mt-2">
              {upcomingEvents.map((event, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center bg-white rounded-lg px-4 py-3 shadow"
                >
                  <span className="text-gray-500 text-sm">{event.time}</span>
                  <span className="font-medium text-gray-800">
                    {event.title}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
