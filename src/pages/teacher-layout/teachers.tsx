import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { UserDropdown } from "@components";

const { Header, Sider, Content } = Layout;

const TeacherLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: "dashboard",
      icon: <PieChartOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/teacher"),
    },
    {
      key: "groups",
      icon: <TeamOutlined />,
      label: "My Groups",
      onClick: () => navigate("/teacher/groups"),
    },
  ];

  const selectedKey = location.pathname.split("/")[2] || "dashboard";

  return (
    <Layout style={{ minHeight: "100vh", margin: 0 }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={200}
        style={{ background: "white" }}
      >
        {/* Logo */}
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 700,
            color: "#1677ff",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          {!collapsed ? "Edu ERP" : "E"}
        </div>

        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18 }}
          />

          {/* UserDropdown  */}
          <UserDropdown />
        </Header>

        <Content
          style={{
            margin: "20px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default TeacherLayout;
