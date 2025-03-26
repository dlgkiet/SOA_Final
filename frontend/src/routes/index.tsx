import Dashboard from "@/pages/general/dashboard";
import Test from "@/pages/general/test";
import { PropsWithChildren, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
