import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TUser } from "../../utils/types";
export const GetUserById = createAsyncThunk(
  "user/data",
  async (userid: string, thunkAPI) => {
    try {
      const responce = await axios.get<TUser>("http://localhost:5000/user/me",{
       data:{
          id: userid
        }
      } 
    );
      return responce.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось получить данные");
    }
  }
);