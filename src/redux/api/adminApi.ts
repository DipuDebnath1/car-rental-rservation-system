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

    // update car
    updateCar: builder.mutation({
      query: (payload) => {
        return {
          url: `/cars/${payload.id}`,
          method: "PUT",
          body: payload.data,
        };
      },
      invalidatesTags: ["cars", "admin"],
    }),

    // delete car
    deleteCar: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `cars/${id}`,
      }),
      invalidatesTags: ["cars"],
    }),
  }),
});

export const {
  useFindAllBookingQuery,
  usePostCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = adminApi;
