import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TUser } from "../../utils/types";
interface data {
  data: TUser;
}
export const registration = createAsyncThunk(
  "user/registration",
  async (userData: FormData, thunkAPI) => {
    try {
      const responce = await axios.post<data>(
        "http://localhost:5000/signup",
        userData
      );
      return responce.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось зарегистрироваться");
    }
  }
);
