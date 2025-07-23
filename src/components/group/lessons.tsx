import type { GroupLessonsType } from "@types";
import LessonsLists from "../lessons-lists/lessons-lists";

const GroupLessons = ({ lessons }: GroupLessonsType ) => {

  return <LessonsLists lessons={lessons} />;

};

export default GroupLessons;
