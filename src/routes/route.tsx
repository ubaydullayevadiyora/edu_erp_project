import {
  createRoutesFromElements,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { createBrowserRouter, Route } from "react-router-dom";
import App from "../App";
import {
  SignIn,
  SignUp,
  NotFound,
  TeacherLayout,
  StudentLayout,
  AdminLayout,
  Groups,
  Courses,
  LayoutProtect,
  LoginProtect,
} from "@pages";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route
          index
          element={
            <LoginProtect>
              <SignIn />
            </LoginProtect>
          }
        />
        <Route path="sign-up" element={<SignUp />} />

        {/* admin layout */}
        <Route
          path="admin"
          element={
            <LayoutProtect>
              <AdminLayout />
            </LayoutProtect>
          }
        >
          <Route index element={<Navigate to="groups" replace />} />
          <Route path="groups" element={<Groups />} />
          <Route path="courses" element={<Courses />} />
          <Route path="student" element={<StudentLayout />} />
        </Route>

        {/* teacher layout */}
        <Route path="teacher" element={<TeacherLayout />}></Route>

        {/* student layout */}
        <Route path="student" element={<StudentLayout />}></Route>

        {/* not found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
