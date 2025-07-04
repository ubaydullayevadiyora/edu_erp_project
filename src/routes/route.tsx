import { createRoutesFromElements, RouterProvider } from "react-router-dom";
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
} from "@pages";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />

        {/* admin layout */}
        <Route path="admin" element={<AdminLayout />}>
          <Route path="groups" element={<Groups />} />
        </Route>

        {/* teacher layout */}
        <Route path="teacher" element={<TeacherLayout />}></Route>

        {/* student layout */}
        <Route path="student" element={<StudentLayout />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
