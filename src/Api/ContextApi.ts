import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userModel } from "./Types/user.models";

export const ContextApi = createApi({
    reducerPath: "ContextApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    tagTypes: ["user"],

    endpoints: (builder) => ({

        // View user List - Home Page
        getUsers: builder.query<userModel[], void>({
            query: () => '/users',
            providesTags: ["user"],
        }),

        // View Single User 
        getUserById: builder.query<userModel, string>({
            query: (id: string) => `/users/${id}`,
            providesTags: ["user"]
        }),

        // Create a new User 
        createUser: builder.mutation<{}, userModel>({
            query: (user) => ({
                url: "/users",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["user"],
        }),

        // update User mutation  
        updateUser: builder.mutation<void, userModel>({
            query: ({ id, ...updatedUser }) => ({
                url: `/users/${id}`,
                method: "PUT",
                body: updatedUser,
            }),
            invalidatesTags: ["user"]
        }),

        // delete User 
        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["user"]
        }),

    })
})

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = ContextApi;