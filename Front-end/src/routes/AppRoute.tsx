import { Route, Routes } from "react-router-dom";
import {
  commonRoutes,
  adminRoutes,
} from "./RouteByRole";
import { ROLES } from "./roles";
import AuthRoute from "./AuthRoute";
import Sidebar from "../components/common/sidebar/Sidebar";
import WrapLayoutCustomer from "../components/common/wrapper/WrapLayoutCustomer";
import Page404 from "../pages/common/ErrorPage/Page404";
import CheckAuthenticate from "../components/common/wrapper/CheckAuthenticate";

type commonRouteType = {
  path: string;
  element: JSX.Element;
  isWrapLayout: boolean;
};
const AppRoutes = () => {
  return (
    <Routes>
      {commonRoutes.map((route: commonRouteType) => {
        if (route.path === "/login")
          return (
            <Route key={"check_auth"} element={<CheckAuthenticate />}>
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
                index
              />
            </Route>
          );     
        if (route.isWrapLayout) {
          return (
            <Route key={"wrap_layout2"} element={<WrapLayoutCustomer />}>
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            </Route>
          );
        } else
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
      })}


      {/* Manager routes with protected */}
      <Route
        key={"private"}
        element={<AuthRoute allowedRoles={[ROLES.ADMIN]} />}
      >
        <Route element={<Sidebar />}>
          {adminRoutes.map((route, index) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Route>
      </Route>

      {/* Routes not exist */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;
