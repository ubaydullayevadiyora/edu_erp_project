import { Button, Table, Space, type TablePaginationConfig, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGeneral, useRoom } from "@hooks";
import type { Rooms } from "@types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RoomModal from "./rooms-modal";
import PopConfirm from "../../components/pop-confirm";
import { RoomColumns } from "../../components/table-columns";

const Rooms = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<Rooms | null>(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
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
          <Button
            type="primary"
            onClick={() => editItem(record)}
            style={{ width: 35, height: 35 }}
          >
            <EditOutlined />
          </Button>

          <PopConfirm
            handleDelete={() => deleteItem(record.id!)}
            loading={isDeleting}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {open && <RoomModal open={open} toggle={toggle} update={update} />}
      <div className="w-full">
        <h1 className="text-xl font-bold mb-2">ROOMS</h1>

        {/* Tugmani chapga suradigan konteyner */}
        <div className="flex justify-between mb-4 p-1">
          <Input.Search
            placeholder="Search rooms..."
            allowClear
            enterButton
            className="max-w-xs"
            onSearch={(value) => console.log("Search:", value)}
          />

          <Button
            type="primary"
            onClick={() => setOpen(true)}
            className="!bg-blue-600 !text-white"
          >
            + add room
          </Button>
        </div>
      </div>

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
