import { Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../hooks/UseTypesSelector";

const Profile = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  return (
    <div>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginTop: "30px" }}
        gutterBottom
      >
        Аккаунт пользователя с email :
        <span className="profile-span">{user?.email}</span>
      </Typography>
      <Typography variant="h5" sx={{ textAlign: "center" }} gutterBottom>
        Аккаунт пользователя с id :
        <span className="profile-span">{user?._id}</span>
      </Typography>
    </div>
  );
};

export default Profile;
