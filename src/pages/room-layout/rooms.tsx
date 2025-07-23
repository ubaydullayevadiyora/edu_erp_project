import { Button, Table, Space, type TablePaginationConfig } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useGeneral, useRoom } from "@hooks";
import type { Rooms } from "@types";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RoomModal from "./rooms-modal";
import PopConfirm from "../../components/pop-confirm";
import { RoomColumns } from "../../components/table-columns";

const Rooms = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<Rooms | null>(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 6,
  });

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    if (page && limit) {
      setParams(() => ({
        page: Number(page),
        limit: Number(limit),
      }));
    }
  }, [location.search]);

  const { data, useRoomDelete } = useRoom(params);
  const { mutate: deleteFn, isPending: isDeleting } = useRoomDelete();
  const { handlePagination } = useGeneral();

  const toggle = () => {
    setOpen(!open);
    if (update) {
      setUpdate(null);
    }
  };

  const editItem = (record: Rooms) => {
    setUpdate(record);
    setOpen(true);
  };

  const deleteItem = (id: number) => {
    deleteFn(id);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    handlePagination({ pagination, setParams });
  };

  const columns = [
    ...(RoomColumns ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Rooms) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editItem(record)}>
            <EditOutlined />
          </Button>

          <PopConfirm
            handleDelete={() => deleteItem(record.id!)}
            loading={isDeleting}
          />

          <Link to={`/admin/room/${record.id}`}>
            <Button type="primary" ghost>
              <EyeOutlined />
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      {open && <RoomModal open={open} toggle={toggle} update={update} />}
      <Button type="primary" onClick={() => setOpen(true)}>
        Add Room
      </Button>

      <Table<Rooms>
        columns={columns}
        dataSource={data?.data?.rooms}
        rowKey={(row) => row.id!}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.data?.total,
          showSizeChanger: true,
          pageSizeOptions: ["4", "6", "10"],
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default Rooms;
