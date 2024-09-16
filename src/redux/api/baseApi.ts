
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath:'baseApi',
    tagTypes:['cars'],
    baseQuery:fetchBaseQuery({baseUrl:"https://car-rental-reservation-system-rho.vercel.app/api"}),
    endpoints:(builder) =>({
        getCars :builder.query({
            query:()=>"/cars",
            providesTags:['cars']
        })
    })
})

export const {useGetCarsQuery} = baseApi