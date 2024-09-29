import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["cars", "user", "booking", "admin"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    // "https://car-rental-reservation-system-server-cxh11vmab.vercel.app/api",

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

    // find by search-criteria
    getCarsWithSearchCriteria: builder.query({
      query: (data) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params = () => {
          const queryParts = [];

          // Check for status and add to query parts if exists
          if (data?.features) {
            queryParts.push(`features=${encodeURIComponent(data.features)}`);
          }

          // Check for name and encode it before adding
          if (data?.name) {
            queryParts.push(`name=${encodeURIComponent(data.name)}`);
          }

          // Check for type and encode it before adding
          if (data?.type) {
            queryParts.push(`type=${encodeURIComponent(data.type)}`);
          }

          // Return the complete query string or an empty string if no parameters
          return queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
        };

        const url = `/cars/search-criteria${params()}`;

        return {
          url,
          method: "GET",
        };
      },
    }),

    //query a cars
    getCar: builder.query({
      query: (id) => `/cars/${id}`,
      providesTags: ["cars"],
    }),

    //sign Up User a cars
    signUpUser: builder.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        body: data,
        method: "POST",
      }),
    }),
    //sign In User a cars
    signInUser: builder.mutation({
      query: (data) => ({
        url: `/auth/signin`,
        body: data,
        method: "POST",
      }),
    }),

    //update update-profile
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/auth/update-profile`,
        method: "PUT",
        body: data,
      }),
    }),

    // book a car
    bookACar: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["cars", "booking"],
    }),

    //query user booking cars
    getUserBookingCars: builder.query({
      query: (status) => {
        const queryParam = status ? `?status=${status} ` : "";
        return {
          url: `/bookings/my-bookings${queryParam}`,
          method: "GET",
        };
      },
      providesTags: ["booking", "cars"],
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
  useGetCarsWithSearchCriteriaQuery,
  useSignInUserMutation,
  useSignUpUserMutation,
  useGetUserBookingCarsQuery,
  useUpdateUserMutation,
  useBookACarMutation,
  useGetUpcomingBookingQuery,
  useUserCancelHisBookingMutation,
} = baseApi;
