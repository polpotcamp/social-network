import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/Api";
import { TPost } from "../utils/types";
export const postAPI = createApi({
  reducerPath: "postAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    fetchAllPosts: build.query<TPost[], void>({
      query: () => ({
        url: `/posts`,
      }),
      providesTags: (result) => ["Post"],
    }),
    createPost: build.mutation<TPost, FormData>({
      query: (post) => ({
        url: `/posts`,
        method: "POST",
        body: post,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("Token") as string),
        },
      }),
      invalidatesTags: ["Post"],
    }),
    fetchPost: build.query<TPost, string>({
      query: (postId) => ({
        url: `/posts/${postId}`,
        params: {
          postId: postId,
        },
      }),
      providesTags: (result) => ["Post"],
    }),
  }),
});
