import Dashboard from "@/pages/general/dashboard";
import Test from "@/pages/general/test";
import Courselist from "@/pages/teacher/Courselist";
import CourseSchedule from "@/pages/teacher/CourseSchedule";
import CourseStudents from "@/pages/teacher/CourseStudents";
import { PropsWithChildren, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

const Wrapper = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return <>{children}</>;
};

const routes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/teacher/courses",
    element: <Courselist />, // Component to show list of courses
  },
  {
    path: "/teacher/courses/students/:id",
    element: <CourseStudents />, // Component to show list of students in a class
  },
  {
    path: "/teacher/courses/schedule/:id",
    element: <CourseSchedule />, // Component to manage class schedules
  },
];

const AppRoutes = () => {
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
