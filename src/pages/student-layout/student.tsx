import { Button, Table, Space, type TablePaginationConfig, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGeneral, useStudent } from "@hooks";
import type { Student } from "@types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StudentModal from "./student-modal";
import PopConfirm from "../../components/pop-confirm";
import { StudentColumns } from "../../components/table-columns";

const Students = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<Student | null>(null);
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

  const { data, useStudentDelete } = useStudent(params);
  const { mutate: deleteFn, isPending: isDeleting } = useStudentDelete();
  const { handlePagination } = useGeneral();

  const deleteItem = (id: number) => {
    deleteFn(id);
  };

  const editItem = (record: Student) => {
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
    ...(StudentColumns ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Student) => (
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
      {open && <StudentModal open={open} toggle={toggle} update={update} />}
      {/* SEARCH, ADD BUTTON */}
      <div className="w-full">
        <h1 className="text-xl font-bold mb-2">STUDENTS</h1>

        {/* Tugmani chapga suradigan konteyner */}
        <div className="flex justify-between mb-4 p-1">
          <Input.Search
            placeholder="Search students..."
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
            + add students
          </Button>
        </div>
      </div>

      <Table<Student>
        columns={columns}
        dataSource={data?.data?.data}
        rowKey={(row) => row.id}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.data?.total,
          showSizeChanger: true,
          pageSizeOptions: ["4", "6", "10", "20"],
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default Students;
