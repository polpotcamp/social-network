import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface data {
    token: string
}
export type TLog = {
  email: string;
  password: string;
};
export const login = createAsyncThunk(
  "userApi/login",
  async (userData: TLog, thunkAPI) => {
    try {
      const responce = await axios.post<data>("http://localhost:5000/signin", {
        email: userData.email,
        password: userData.password,
      });
      console.log(responce)
      return responce.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось войти");
    }
  }
);