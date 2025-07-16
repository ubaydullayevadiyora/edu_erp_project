import { Button, Table, Space, type TablePaginationConfig } from "antd";
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
    limit: 6,
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
          <Button type="primary" onClick={() => editItem(record)}>
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
      <Button type="primary" onClick={() => setOpen(true)}>
        Add Student
      </Button>
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
