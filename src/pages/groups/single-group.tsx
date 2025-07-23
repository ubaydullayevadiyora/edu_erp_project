import { useParams } from "react-router-dom";
import { useGroup } from "@hooks";
import {GroupLessons, GroupStudents, GroupTeachers} from "@components"

const SingleGroup = () => {

  const { id } = useParams<{ id: string }>();
  const { students, lessons, teachers } = useGroup(
    { page: 1, limit: 10 },
    Number(id)
  );

  return (
    <div>
      {teachers?.data.length > 0 && <GroupTeachers teachers={teachers?.data} />}
      {lessons?.data.lessons.length > 0 && (<GroupLessons lessons={lessons?.data.lessons} />)}
      {/* {lessons?.data.lessons.length > 0 && (<GroupLessons groupLessons={lessons?.data.lessons} />)} */}
      {students?.data.length > 0 && <GroupStudents students={students?.data} />}
    </div>
  );
};

export default SingleGroup;