import { Button, Table, Space, type TablePaginationConfig, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGeneral, useBranch } from "@hooks";
import type { Branch } from "@types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BranchModal from "./branch-modal";
import PopConfirm from "../../components/pop-confirm";
import { BranchColumns } from "../../components/table-columns";

const Branch = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<Branch | null>(null);
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

  const { data, useBranchDelete } = useBranch(params);
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useBranchDelete();

  const deleteItem = (id: number) => {
    deleteFn(id);
  };

  const editItem = (record: Branch) => {
    setUpdate(record);
    setOpen(true);
  };

  const toggle = () => {
    setOpen(!open);
    if (update) {
      setUpdate(null);
    }
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    handlePagination({ pagination, setParams });
  };

  const columns = [
    ...(BranchColumns ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Branch) => (
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
      {open && <BranchModal open={open} toggle={toggle} update={update} />}
      {/* <h1>GROUPS</h1> */}
      <div className="w-full">
        <h1 className="text-xl font-bold mb-2">BRANCHES</h1>

        {/* Tugmani chapga suradigan konteyner */}
        <div className="flex justify-between mb-4 p-1">
          <Input.Search
            placeholder="Search branches..."
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
            + add branches
          </Button>
        </div>
      </div>
      <Table<Branch>
        columns={columns}
        dataSource={data?.data?.branch}
        rowKey={(row) => row.id!}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.data?.total,
          showSizeChanger: true,
          pageSizeOptions: ["4", "5", "6", "7", "10"],
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default Branch;
