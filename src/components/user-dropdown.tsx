import { Avatar, Dropdown, Typography, type MenuProps } from "antd";
import {
  DoubleRightOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserDropdown = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const roleFromStorage = localStorage.getItem("role");
    if (roleFromStorage) {
      setRole(roleFromStorage);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "My Profile",
      icon: <UserOutlined />,
      onClick: () => navigate("/profile"),
    },
    ...(role === "admin"
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
      icon: <DoubleRightOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems }} trigger={["hover"]}>
      <div className="cursor-pointer flex items-center gap-2">
        <Avatar>{role?.charAt(0).toUpperCase()}</Avatar>
        <Typography.Text strong>{role}</Typography.Text>
      </div>
    </Dropdown>
  );
};

export default UserDropdown;
