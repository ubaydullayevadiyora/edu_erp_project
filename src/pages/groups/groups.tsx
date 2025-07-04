import { useEffect } from "react";
import { groupService } from "../../service";
import { Space, Table, Tag } from "antd";
import type { Group } from "../../types";

const { Column, ColumnGroup } = Table;

const Groups = () => {
  useEffect(() => {
    groupService.getGroups();
  }, []);

  const save = () => {
    const payload = {
      name: "group-1",
      course_id: 1,
      status: "new",
      start_date: "2025-06-01",
      end_date: "2025-09-01",
    };
    groupService.createGroup(payload);
  };
  return (
    <Table<Group>>
      <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
      </ColumnGroup>
      <Column title="Age" dataIndex="age" key="age" />
      <Column title="Address" dataIndex="address" key="address" />
      <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={(tags: string[]) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        )}
      />
      <Column
        title="Action"
        key="action"
        render={(_: any, record:Group) => (
          <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
    // <div>
    //   <h1>Groups</h1>
    //   <button onClick={save}>save</button>
    // </div>
  );
};

export default Groups;
