import { useState } from "react";
import { authService } from "@service";
import { useNavigate } from "react-router-dom";
import { setItem } from "../../helpers";
import { Button, Input, Select, Form, Typography, Card, message } from "antd";

const { Option } = Select;
const { Title, Text } = Typography;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();

  const submit = async () => {
    const payload = { email, password };
    try {
      const res = await authService.signIn(payload, role);
      if (res?.status === 201) {
        setItem("access_token", res.data.access_token);
        setItem("role", role);
        navigate(`/${role}`);
      } else {
        message.error("Login failed");
      }
    } catch (err) {
      message.error("Something went wrong");
    }
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
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
