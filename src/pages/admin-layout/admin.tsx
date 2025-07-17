import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  SettingOutlined,
  UserOutlined,
  PaperClipOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Tooltip } from "antd";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  const menuItems = [
    {
      key: "groups",
      icon: <TeamOutlined />,
      label: "Groups",
      onClick: () => navigate("/admin/groups"),
    },
    {
      key: "courses",
      icon: <PaperClipOutlined />,
      label: "Courses",
      onClick: () => navigate("/admin/courses"),
    },
    {
      key: "student",
      icon: <UserOutlined />,
      label: "Student",
      onClick: () => navigate("/admin/student"),
    },
    {
      key: "teacher",
      icon: <UserSwitchOutlined />,
      label: "Teacher",
      onClick: () => navigate("/admin/teacher"),
    },
    {
      key: "branches",
      icon: <AppstoreOutlined />,
      label: "Branches",
      onClick: () => navigate("/admin/branches"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => navigate("/admin/settings"),
    },
  ];

  const selectedKey = location.pathname.split("/")[2] || "groups";

  return (
    <Layout style={{ minHeight: "100vh", margin: 0 }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={200}
        style={{ background: "#001529" }}
      >
        <Menu
          theme="dark"
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

          {/* 👉 Log Out icon */}
          <Tooltip title="Log out">
            <LogoutOutlined
              onClick={handleLogout}
              style={{
                fontSize: 15,
                cursor: "pointer",
                color: "#ff4d4f",
              }}
            />
          </Tooltip>
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

export default AdminLayout;
