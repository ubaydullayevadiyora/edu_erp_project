import { useParams } from "react-router-dom";
import { Table, Switch } from "antd";
import dayjs from "dayjs";

const SingleGroupJournal = () => {
  const { id } = useParams();

  const today = dayjs().format("dddd, MMMM D, YYYY");

  const columns = [
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Came?",
      key: "came",
      render: (_: any, record: any) => (
        <Switch
          defaultChecked
          onChange={(value) => console.log(record.id, value)}
        />
      ),
    },
  ];

  const dummyData = [
    { id: 1, full_name: "Alisher Alimov" },
    { id: 2, full_name: "Dilnoza Karimova" },
    { id: 3, full_name: "Farruh Qodirov" },
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="text-xl font-semibold">{today}</div>

      <div className="border rounded-lg p-4 bg-white">
        <h2 className="text-lg font-medium mb-2">Attendance Journal</h2>
        <Table
          columns={columns}
          dataSource={dummyData}
          rowKey={(row) => row.id}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default SingleGroupJournal;
