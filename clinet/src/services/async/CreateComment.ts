import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export type TCreateComment = {
  postId: any;
  comment: any;
};
export const CreateComment = createAsyncThunk(
  "comment/create",
  async (data: TCreateComment, thunkAPI) => {
    try {
      console.log(data);
      const responce = await axios.post(`http://localhost:5000/comments/:${data.postId}`,
        data,{
          headers: {
            Authorization: JSON.parse(localStorage.getItem("Token") as string),
          },
        }
      );
      return responce.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось получить данные");
    }
  }
);
