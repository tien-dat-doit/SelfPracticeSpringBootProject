import ListCategory from "../pages/admin/ListPermission";
import ListUser from "../pages/admin/ListUser";
import Login from "../pages/common/Authentication/Login";
import Register from "../pages/common/Authentication/Register";
import ChatRoom from "../pages/common/ChatPage/ChatPage";
import Page401 from "../pages/common/ErrorPage/Page401";
import Page403 from "../pages/common/ErrorPage/Page403";
import Home from "../pages/common/Home/Home";

export const commonRoutes = [
  {
    path: "/",
    element: <Home />,
    isWrapLayout: true,
  },
  {
    path: "/chat",
    element: <ChatRoom />,
    isWrapLayout: true,
  },
  {
    path: "/login",
    element: <Login />,
    isWrapLayout: false,
  },
  {
    path: "/register",
    element: <Register />,
    isWrapLayout: false,
  },
  {
    path: "/401",
    element: <Page401 />,
    isWrapLayout: false,
  },
  {
    path: "/403",
    element: <Page403 />,
    isWrapLayout: false,
  },
];


export const adminRoutes = [
  {
    path: "/admin/manage-user",
    element: <ListUser />,
  },
  {
    path: "/admin/manage-permission",
    element: <ListCategory />,
  },
];



