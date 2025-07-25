import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

interface PopConfirmProps {
  handleDelete: () => void;
  loading: boolean;
}

const PopConfirm = ({ handleDelete, loading }: PopConfirmProps) => {
  return (
    <Popconfirm
      title="Delete the item"
      description="Are you sure to delete this item?"
      okText="Yes"
      cancelText="No"
      onConfirm={handleDelete}
    >
      <Button type="primary" danger loading={loading} style={{width:35, height:35}}>
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};

export default PopConfirm;
