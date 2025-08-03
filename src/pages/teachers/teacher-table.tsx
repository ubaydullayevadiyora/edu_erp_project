import { Button, Table, Space, type TablePaginationConfig, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGeneral, useTeacher } from "@hooks";
import type { Teacher } from "@types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TeacherModal from "./teacher-modal";
import PopConfirm from "../../components/pop-confirm";
import { TeacherColumns } from "../../components/table-columns";

const Teachers = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<Teacher | null>(null);
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
      setParams({
        page: Number(page),
        limit: Number(limit),
      });
    }
  }, [location.search]);

  // teacher hook
  const { data, useTeacherDelete } = useTeacher(params);

const { mutate: deleteFn, isPending } = useTeacherDelete();

  const { handlePagination } = useGeneral();

  const deleteItem = (id: number) => {
    deleteFn(id);
  };

  const editItem = (record: Teacher & { id: number }) => {
    setUpdate(record);
    setOpen(true);
  };

  const toggle = () => {
    setOpen(!open);
    if (update) setUpdate(null);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    handlePagination({ pagination, setParams });
  };

  const columns = [
    ...(TeacherColumns ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Teacher) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => editItem(record)}
            style={{ width: 35, height: 35 }}
          >
            <EditOutlined />
          </Button>
          <PopConfirm
            handleDelete={() => deleteItem(record.id)}
            loading={isPending}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {open && <TeacherModal open={open} toggle={toggle} update={update} />}
      <div className="w-full">
        <h1 className="text-xl font-bold mb-2">TEACHERS</h1>

        <div className="flex justify-between mb-4 p-1">
          <Input.Search
            placeholder="Search teachers..."
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
            + add teachers
          </Button>
        </div>
      </div>

      <Table<Teacher>
        columns={columns}
        dataSource={data?.data?.data}
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

export default Teachers;
