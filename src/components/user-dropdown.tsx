// components/user-dropdown.tsx
import { Avatar, Dropdown, Typography, type MenuProps } from "antd";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserDropdown = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    first_name: string;
    role: string;
    avatar_url?: string;
  } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      console.log("Parsed user:", parsed); // ✅ log for testing
      setUser(parsed);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return null;

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "My Profile",
      icon: <UserOutlined />,
      onClick: () => navigate("/profile"),
    },
    ...(user.role === "admin"
      ? [
          {
            key: "settings",
            label: "Settings",
            icon: <SettingOutlined />,
            onClick: () => navigate("/admin/settings"),
          },
        ]
      : []),
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Log out",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
      <div className="cursor-pointer flex items-center gap-2">
        <Avatar src={user.avatar_url}>
          {user.first_name?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text strong>{user.first_name}</Typography.Text>
      </div>
    </Dropdown>
  );
};

export default UserDropdown;
