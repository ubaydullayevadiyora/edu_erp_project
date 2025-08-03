import { Avatar, Dropdown, Typography, Modal, type MenuProps } from "antd";
import { DoubleRightOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserDropdown = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const roleFromStorage = localStorage.getItem("role"); // admin | teacher | student
    if (roleFromStorage) {
      setRole(roleFromStorage);
    }
  }, []);

  const handleLogout = () => setIsModalOpen(true);

  const confirmLogout = () => {
    localStorage.clear();
    setIsModalOpen(false);
    navigate("/");
  };

  const cancelLogout = () => setIsModalOpen(false);

  const goProfile = () => {
    if (role === "admin") navigate("/admin/profile");
    if (role === "teacher") navigate("/teacher/profile");
    if (role === "student") navigate("/student/profile");
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "My Profile",
      icon: <UserOutlined />,
      onClick: goProfile,
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
    <>
      <Dropdown menu={{ items: menuItems }} trigger={["hover"]}>
        <div className="cursor-pointer flex items-center gap-2">
          <Avatar>{role?.charAt(0).toUpperCase()}</Avatar>
          <Typography.Text strong>{role}</Typography.Text>
        </div>
      </Dropdown>

      <Modal
        title="Log out"
        open={isModalOpen}
        onOk={confirmLogout}
        onCancel={cancelLogout}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure log out?</p>
      </Modal>
    </>
  );
};

export default UserDropdown;
