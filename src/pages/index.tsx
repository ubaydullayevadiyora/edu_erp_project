import { lazy } from "react";

const SignIn = lazy(() => import("./auth/sign-in"));
const SignUp = lazy(() => import("./auth/sign-up"));
const NotFound = lazy(() => import("./not-found/not-found"));
const StudentLayout = lazy(() => import("./student-layout/student"));
const TeacherLayout = lazy(() => import("./teacher-layout/teacher"));
const AdminLayout = lazy(() => import("./admin-layout/admin"));
const Groups = lazy(() => import("./groups/groups"));
const Courses = lazy(() => import("./courses/courses"));
const LayoutProtect = lazy(() => import("./protect-routes/layout-protect"));
const LoginProtect = lazy(() => import("./protect-routes/login-protect"));
const BranchLayout = lazy(() => import("./branch-layout/branch"));
const Worker = lazy(() => import("./worker/worker"));

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
  BranchLayout,
  Worker,
};
