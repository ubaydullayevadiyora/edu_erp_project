import { Button, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
  
    localStorage.removeItem("token");
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="text" danger onClick={showModal}>
        Logout
      </Button>
      <Modal
        title="Log Out"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes, Logout"
        cancelText="Cancel"
        width={350}
        centered
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </>
  );
};

export default Logout;
