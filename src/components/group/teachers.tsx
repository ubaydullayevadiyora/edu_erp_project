import { Collapse } from "antd";

const { Panel } = Collapse;

const GroupTeachers = ({ teachers }: any) => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Group Teachers</h1>

      <Collapse
        defaultActiveKey={["0"]}
        style={{ width: "400px", maxHeight: "300px", overflowY: "auto" }}
      >
        {teachers.map((item: any, index: number) => (
          <Panel
            header={`${item.teacher.first_name} ${item.teacher.last_name}`}
            key={index.toString()}
          >
            <p>
              <strong>Email:</strong> {item.teacher.email}
            </p>
            <p>
              <strong>Phone:</strong> {item.teacher.phone}
            </p>
            <p>
              <strong>Role:</strong> {item.teacher.role}
            </p>
            <p>
              <strong>Start Date:</strong> {item.start_date}
            </p>
            <p>
              <strong>End Date:</strong> {item.end_date}
            </p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default GroupTeachers;
