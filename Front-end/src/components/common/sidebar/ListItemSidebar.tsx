import PeopleIcon from "@mui/icons-material/People";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';


export const adminSidebarItems = [
  {
    title: "Danh sách người dùng",
    path: "/admin/manage-user",
    icon: <PeopleIcon />,
  },
  {
    title: "Danh sách quyền",
    path: "/admin/manage-permission",
    icon: <VpnKeyOutlinedIcon />,
  },
];

