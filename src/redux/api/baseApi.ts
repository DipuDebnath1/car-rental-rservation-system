import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["cars", "user", "booking", "admin"],
  baseQuery: fetchBaseQuery({
    // baseUrl:"https://car-rental-reservation-system-oe6by7q2p.vercel.app/api",
    baseUrl: "http://localhost:5000/api",

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    //query all cars
    getCars: builder.query({
      query: (status) => {
        const query = status ? `?status=${status}` : "";
        return {
          url: `/cars${query}`,
          method: "GET",
        };
      },
      providesTags: ["cars"],
    }),

    //query a cars
    getCar: builder.query({
      query: (id) => `/cars/${id}`,
      providesTags: ["cars"],
    }),

    //query a cars
    signInUser: builder.mutation({
      query: (data) => ({
        url: `/auth/signin`,
        body: data,
        method: "POST",
      }),
    }),

    //update update-profile a cars
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/auth/update-profile`,
        method: "PUT",
        body: data,
      }),
    }),

    //query a cars
    getUserBookingCars: builder.query({
      query: (status) => {
        const queryParam = status ? `?status=${status} ` : "";
        return {
          url: `/bookings/my-bookings${queryParam}`,
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),

    //get Upcoming Booking
    getUpcomingBooking: builder.query({
      query: () => {
        return {
          url: `/bookings/my-upcoming-booking`,
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),

    //get Upcoming Booking
    userCancelHisBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings/cancel-my-booking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useGetCarsQuery,
  useGetCarQuery,
  useSignInUserMutation,
  useGetUserBookingCarsQuery,
  useUpdateUserMutation,
  useGetUpcomingBookingQuery,
  useUserCancelHisBookingMutation,
} = baseApi;
