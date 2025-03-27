import React, { PropsWithChildren, useLayoutEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// General
import Dashboard from "@/pages/general/dashboard";
import Test from "@/pages/general/test";
import Courselist from "@/pages/teacher/Courselist";
import CourseSchedule from "@/pages/teacher/CourseDetail";
import CourseStudents from "@/pages/teacher/CourseStudents";
import CourseDetail from "@/pages/teacher/CourseDetail";
import ProtectedRoute from "./protected";
import Login from "@/pages/auth";
import StudentLogin from "@/pages/auth/student-login";
import TeacherLogin from "@/pages/auth/teacher-login";

const Wrapper = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return <>{children}</>;
};

/** Define Routes HERE */
const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/student-login",
    element: <StudentLogin />
  },
  {
    path: "/teacher-login",
    element: <TeacherLogin />
  },
  {
    path: "/teacher/courses",
    element: <Courselist />, // Component to show list of courses
  },
  {
    path: "/teacher/courses/:id",
    element: <CourseDetail />, // Component to show list of courses
  },
  {
    path: "/teacher/courses",
    element: <Courselist />, // Component to show list of courses
  },
  {
    path: "/teacher/courses/:id",
    element: <CourseDetail />, // Component to show list of courses
  },
];

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Wrapper>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Wrapper>
    </Router>
  );
};

export default AppRoutes;
