import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ********* manage booking *********

    // find all booking
    findAllBooking: builder.query({
      query: (status) => {
        const query = status ? `?status=${status}` : "";
        return {
          url: `/bookings${query}`,
          method: "GET",
        };
      },
      providesTags: ["admin"],
    }),

    // cancelled booking
    cancelBooking: builder.mutation({
      query: (userId) => ({
        url: "/bookings/canceled-booking",
        body: userId,
        method: "POST",
      }),
      invalidatesTags: ["booking", "admin"],
    }),

    // approve booking
    approveBooking: builder.mutation({
      query: (userId) => ({
        url: "/bookings/approve-booking",
        body: userId,
        method: "POST",
      }),
      invalidatesTags: ["booking", "admin"],
    }),

    // return booking

    returnBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings/return",
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["booking", "cars"],
    }),

    // *******manage car *****

    // post car
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

    // ******** manage user **********

    // find all booking
    findAllUser: builder.query({
      query: () => {
        return {
          url: `/auth/all-users`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    // update user role
    updateUserRole: builder.mutation({
      query: (data) => ({
        url: "/auth/update-role",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    // block user
    manageUserBlock: builder.mutation({
      query: (data) => {
        const blockStatus = data.isBlocked ? "block" : "unblock";
        return {
          url: `/auth/${blockStatus}`,
          method: "POST",
          body: { userId: data.userId },
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useFindAllBookingQuery,
  usePostCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useApproveBookingMutation,
  useCancelBookingMutation,
  useReturnBookingMutation,
  useFindAllUserQuery,
  useUpdateUserRoleMutation,
  useManageUserBlockMutation,
} = adminApi;
