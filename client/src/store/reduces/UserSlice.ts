import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TInitialStateUser } from "../../utils/types";
import { TUser } from "../../utils/types";
import { login } from "../../services/async/Login";
import { logout } from "../../services/async/Logout";
import { GetUserData } from "../../services/async/GetUserData";
import { ChangeUserData } from "../../services/async/ChangeUserData";
interface dataUser {
  data: TUser;
}
interface updatedUser {
  updatedUser: TUser;
}
interface dataToken {
  token: string;
}
const initialState: TInitialStateUser = {
  userId: "",
  userName: "",
  userEmail: "",
  userAvatar: "",
  userAbout: "",
  userSecondName: "",
  userFollowings: [],
  userFollowers: [],
  userFriends: [],
  isAuthChecked: false,
  isAuthorization: false,
};

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.isAuthorization = false;
      state.isAuthChecked = false;
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<dataToken>) => {
        localStorage.setItem("Token", JSON.stringify(action.payload));
        state.isAuthorization = true;
        state.isAuthChecked = true;
      }
    );
    builder.addCase(
      GetUserData.fulfilled,
      (state, action: PayloadAction<dataUser>) => {
        state.userId = action.payload.data._id;
        state.userAbout = action.payload.data.about;
        state.userAvatar = action.payload.data.avatar;
        state.userName = action.payload.data.name;
        state.userSecondName = action.payload.data.secondName;
        state.isAuthorization = true;
        state.isAuthChecked = true;
        state.userFollowers = action.payload.data.followers;
        state.userFollowings = action.payload.data.followings;
        state.userFriends = action.payload.data.friends;
      }
    );
    builder.addCase(logout.fulfilled, (state) => {
      state.userId = "";
      state.isAuthorization = false;
      state.isAuthChecked = false;
      localStorage.clear();
    });
    builder.addCase(
      ChangeUserData.fulfilled,
      (state, action: PayloadAction<updatedUser>) => {
        console.log(action.payload);
        state.userName = action.payload.updatedUser.name;
        state.userSecondName = action.payload.updatedUser.secondName;
        state.userAbout = action.payload.updatedUser.about;
        state.userAvatar = action.payload.updatedUser.avatar;
      }
    );
  },
});
export default userSlice.reducer;
