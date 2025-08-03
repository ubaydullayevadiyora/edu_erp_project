import {
  createRoutesFromElements,
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
  Branch,
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

        {/* admin layout and protected route */}
        <Route
          path="admin"
          element={
            <LayoutProtect>
              <AdminLayout />
            </LayoutProtect>
          }
        >
          {/* Dashboard asosiy sahifa */}
          {/* <Route index element={<AdminDashboard />} /> */}

          {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
          <Route path="group/:id" element={<SingleGroup />} />
          <Route index element={<Groups />} />
          <Route path="courses" element={<Courses />} />
          <Route path="student" element={<Students />} />
          <Route path="teacher" element={<Teachers />} />
          <Route path="branches" element={<Branch />} />
          <Route path="rooms" element={<Room />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        <Route
          path="teacher"
          element={
            <LayoutProtect>
              <TeacherLayout />
            </LayoutProtect>
          }
        >
          <Route index element={<TeacherDashboard />} />{" "}
          {/* Dashboard shown first */}
          <Route path="groups" element={<TeacherGroups />} />
          <Route path="group-students/:id" element={<TeacherGroupStudents />} />
          <Route path="profile" element={<TeacherProfile />} />
        </Route>

        {/* student layout */}
        <Route path="student" element={<StudentLayout />}>
          <Route path="profile" element={<StudentProfile />} />
        </Route>

        {/* not found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
