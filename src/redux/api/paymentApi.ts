import { baseApi } from "./baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    paymentProcess: builder.mutation({
      query: (id) => ({
        url: `/payment/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const { usePaymentProcessMutation } = paymentApi;
