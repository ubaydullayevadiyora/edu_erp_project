export class ApiUrls {
  //Auth
  public static AUTH: string = "/log-in";

  // groups
  public static GROUPS: string = "/group";

  // courses
  public static COURSES: string = "/courses";

  // students
  public static STUDENT: string = "/students";

  //teachers
  public static TEACHER: string = "/teacher";

  // branch
  public static BRANCH: string = "/branches";

  // rooms
  public static ROOM: string = "/rooms";

  // LESSONS
  public static LESSONS: string = "/lessons";
  public static GROUP_LESSONS: string = this.LESSONS + "/group"

  // GROUP TEACHERS
  public static GROUP_TEACHERS: string = "/group-teacher"
  public static GROUP_TEACHERS_BY_GROUP_ID: string = this.GROUP_TEACHERS + "/by-group"

  // GROUP STUDENTS 
  public static GROUP_STUDENTS: string = "/group-students"
  public static GROUP_STUDENTS_BY_GROUP_ID: string = this.GROUP_STUDENTS + '/by-group'
}
