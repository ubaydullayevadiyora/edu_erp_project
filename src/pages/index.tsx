import { lazy } from "react";

const SignIn = lazy(() => import("./auth/sign-in"));
const SignUp = lazy(() => import("./auth/sign-up"));
const NotFound = lazy(() => import("./not-found/not-found"));
const StudentLayout = lazy(() => import("./student-layout/student"));
const Students = lazy(() => import("./students/student-table"));
const Teachers = lazy(() => import("./teachers/teacher-table"));
const TeacherLayout = lazy(() => import("./teacher-layout/teachers"));
const AdminLayout = lazy(() => import("./admin-layout/admin"));
const Groups = lazy(() => import("./groups/groups"));
const Courses = lazy(() => import("./courses/courses"));
const LayoutProtect = lazy(() => import("./protect-routes/layout-protect"));
const LoginProtect = lazy(() => import("./protect-routes/login-protect"));
const Branch = lazy(() => import("./branch/branch"));
const Worker = lazy(() => import("./worker/worker"));
const SingleGroup = lazy(() => import("./groups/single-group"));
const Room = lazy(() => import("./room/rooms"));
const AdminProfile = lazy(() => import("./my-profile/admin-profile"));
const TeacherProfile = lazy(() => import("./my-profile/teacher-profile"));
const StudentProfile = lazy(() => import("./my-profile/student-profile"));
const TeacherGroupStudents = lazy(() => import("./teachers/teacher-groups/group-students"));
const TeacherGroups = lazy(() => import("./teachers/teacher-groups/teacher-groups"));
const TeacherDashboard = lazy(
  () => import("./teachers/teacher-dashboard")
);
const AdminDashboard = lazy(() => import("./admin-layout/admin-dashboard"));

export {
  SignIn,
  SignUp,
  NotFound,
  StudentLayout,
  TeacherLayout,
  AdminLayout,
  Groups,
  Courses,
  LayoutProtect,
  LoginProtect,
  Branch,
  Worker,
  SingleGroup,
  Room,
  AdminProfile,
  TeacherProfile,
  StudentProfile,
  Students,
  Teachers,
  TeacherGroupStudents,
  TeacherGroups,
  TeacherDashboard,
  AdminDashboard,
};
