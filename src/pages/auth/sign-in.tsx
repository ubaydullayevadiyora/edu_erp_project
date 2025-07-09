import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setItem } from "../../helpers";
import { Button, Input, Select, Form, Typography, Card } from "antd";
import { useAuth } from "../../hooks";
const { Option } = Select;
const { Title, Text } = Typography;

const SignIn = () => {
  const { mutate, isPending } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();

  const submit = async () => {
    const payload = { email, password };
    mutate(
      {
        data: payload,
        role,
      },
      {
        onSuccess: (res: any) => {
          if (res.status === 201) {
            setItem("access_token", res.data.access_token);
            setItem("role", role);
            navigate(`/${role}`);
          }
        },
      }
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f2f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Card
        style={{ width: 400, borderRadius: 12 }}
        bodyStyle={{ padding: 32 }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Welcome to Admin Panel
        </Title>
        <Text
          type="secondary"
          style={{ display: "block", textAlign: "center", marginBottom: 24 }}
        >
          Please log in to continue
        </Text>

        <Form layout="vertical" onFinish={submit}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Select Role" name="role">
            <Select value={role} onChange={(value) => setRole(value)}>
              <Option value="admin">Admin</Option>
              <Option value="teacher">Teacher</Option>
              <Option value="student">Student</Option>
              <Option value="lid">Lid</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isPending}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
