import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TUser } from "../../utils/types";
interface updatedUser {
  updatedUser: TUser;
}
export const ChangeUserData = createAsyncThunk("user/update",async (data:FormData, thunkAPI) => {
    try {
      const responce = await axios.patch<updatedUser>(
        "http://localhost:5000/user/update",
        data,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("Token") as string),
          },
        }
      );
      return responce.data
    } catch (e) {
      return thunkAPI.rejectWithValue("не удалось обновить данные ");
    }
  })