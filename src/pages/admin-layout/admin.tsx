import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Typography } from "antd";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: "groups",
      icon: <TeamOutlined />,
      label: "Groups",
      onClick: () => navigate("/admin/groups"),
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
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={200}
        style={{ background: "#001529" }}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            color: "white",
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: "64px",
            background: "rgba(255, 255, 255, 0.15)",
            borderRadius: 8,
          }}
        >
          Admin
        </div>

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
            padding: "0 24px",
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
          <Typography.Text strong>Admin Panel</Typography.Text>
        </Header>

        <Content
          style={{
            padding: 24,
            minHeight: "calc(100vh - 64px)",
            background: "#fff",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
