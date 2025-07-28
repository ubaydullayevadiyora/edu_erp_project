import { Collapse } from "antd";
import { Mail, Phone, BadgeCheck, CalendarDays } from "lucide-react";

const { Panel } = Collapse;

const GroupTeachers = ({ teachers }: any) => {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-textMain">Group Teachers</h1>

      <Collapse
        defaultActiveKey={["0"]}
        className="bg-white rounded-xl border-none"
        expandIconPosition="end"
      >
        {teachers.map((item: any, index: number) => (
          <Panel
            header={
              <div className="flex justify-between items-center">
                <span className="font-medium text-base text-textMain">
                  {item.teacher.first_name} {item.teacher.last_name}
                </span>
                <span className="text-xs bg-blue-700 text-white rounded-full px-2 py-1">
                  {item.teacher.role}
                </span>
              </div>
            }
            key={index.toString()}
          >
            <div className="text-sm space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>{item.teacher.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>{item.teacher.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-primary" />
                <span className="capitalize">{item.teacher.role}</span>
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-primary" />
                <span>Start: {item.start_date}</span>
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-primary" />
                <span>End: {item.end_date}</span>
              </p>
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default GroupTeachers;
