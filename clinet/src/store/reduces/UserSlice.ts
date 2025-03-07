import { createSlice } from "@reduxjs/toolkit";
import { TInitialStateUser } from "../../utils/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../../utils/types";
import { login } from "../../services/async/Login";
import { GetUserData } from "../../services/async/GetUserData";
interface dataUser{
  data:TUser
}
interface dataToken{
  token: string
}
const initialState: TInitialStateUser = {
  userId: "",
  userName: "",
  userEmail: "",
  userAvatar: "",
  userAbout:"",
  userSecondName:"",
  userFollowings: [],
  userFollowers: [],
  userFriends: [],
  isAuthChecked: false,
  isAuthorization: false
};

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      console.log(action.payload)
      state.isAuthorization = false;
      state.isAuthChecked = false;
    },)
    builder.addCase(login.fulfilled,(state, action: PayloadAction<dataToken>)=>{
      localStorage.setItem("Token", JSON.stringify(action.payload))
      state.isAuthorization = true;
      state.isAuthChecked = true;
    })
    builder.addCase(GetUserData.fulfilled,(state, action: PayloadAction<dataUser>)=>{
      state.userId = action.payload.data._id
      state.userAbout = action.payload.data.about
      state.userAvatar = action.payload.data.avatar
      state.userName = action.payload.data.name
      state.userSecondName = action.payload.data.secondName
      state.isAuthorization = true;
      state.isAuthChecked = true;
      state.userFollowers =action.payload.data.followers
      state.userFollowings = action.payload.data.followings
      state.userFriends =action.payload.data.friends
    })
  },
});
export default userSlice.reducer;
