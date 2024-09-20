import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // find all booking
    findAllBooking: builder.query({
      query: () => {
        return {
          url: "/bookings",
          method: "GET",
        };
      },
      providesTags: ["admin"],
    }),

    // post car booking
    postCar: builder.mutation({
      query: (data) => {
        return {
          url: "/cars",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["cars", "admin"],
    }),
  }),
});

export const { useFindAllBookingQuery, usePostCarMutation } = adminApi;
