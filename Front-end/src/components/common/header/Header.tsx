import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/AuthContext";
import { ROLES } from "../../../routes/roles";
import "./Header.css";

const Header: React.FC = () => {
  const currentUser = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    currentUser.setUser(null);
    localStorage.removeItem("userData");
    navigate("/login");
  };
  const renderRole = () => {
    switch (currentUser.user?.role?.toUpperCase()) {
      case ROLES.ADMIN:
        return {
          name: "Quản trị viên",
          icon: <AdminPanelSettingsIcon fontSize="small" />,
        };
      case ROLES.USER:
        return {
          name: "Người dùng",
          icon: <PersonOutlineIcon fontSize="small" />,
        };
    }
  };
  const role = renderRole();

  return (
    <header className="header-container">
      <div className="logo" onClick={()=>navigate("/")}>
        <img src={"/main-logo.png"} alt="Pet SPA" />
        <span style={{fontSize:18,  fontWeight:700}}>Note APP</span>
      </div>
      <nav>
        <ul>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Link to={"/"}>Trang chủ</Link>
          </Stack>      
          {currentUser.user?.role === ROLES.ADMIN && (
           <Stack
           alignItems={"center"}
           justifyContent={"center"}
           flexDirection={"column"}
         >
              <Link to={"/admin/manage-user"}>Bảng điều khiển</Link>
              </Stack>      
          )}
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Link to={"/chat"}>Chat</Link>
          </Stack>   
          {currentUser.user ? (
            <Box>
              <Box>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    // sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      src={"/user-icon.jpg"}
                    ></Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openMenu}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"cenetr"}
                  spacing={1}
                  sx={{ p: 1, minWidth:234 }}
                >
                  <img
                    src={"/user-icon.jpg"}
                    alt="Avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                    }}
                  />
                  <Box>
                    <Typography sx={{ color: "black", fontWeight: 700 }}>
                      {currentUser.user?.name}
                    </Typography>
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      {role?.icon}
                      <Typography sx={{ color: "#dd2c00", fontWeight: 600 }}>
                        {role?.name}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Thông tin cá nhân
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleClose();
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Đăng xuất
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link to={"/login"}>Đăng nhập</Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
