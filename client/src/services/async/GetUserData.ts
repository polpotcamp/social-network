import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TUser } from "../../utils/types";
interface dataUser{
  data:TUser
}
export const GetUserData = createAsyncThunk(
  "user/data",
  async (_, thunkAPI) => {
    try {
      const responce = await axios.get<dataUser>("http://localhost:5000/user/me",{
        headers:{
          Authorization: JSON.parse(localStorage.getItem("Token")as string)
        }
      } 
    );
      return responce.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось получить данные");
    }
  }
);
