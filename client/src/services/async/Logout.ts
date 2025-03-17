import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const responce = await axios.get(
      "http://localhost:5000/logout",
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("Token") as string),
        },
      }
    );
    console.log(responce)
    return responce
  } catch (e) {
    return thunkAPI.rejectWithValue("Не удалось выйти");
  }
});
