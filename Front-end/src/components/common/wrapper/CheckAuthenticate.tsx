import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../../context/AuthContext";

const CheckAuthenticate = () => {
  const currentUser = useContext(UserContext);

  if (!currentUser.user)
    return (
      <>
        <Outlet />
      </>
    );
  else return <Navigate to="/" />;
};

export default CheckAuthenticate;
