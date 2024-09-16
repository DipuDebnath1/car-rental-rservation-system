
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath:'baseApi',
    tagTypes:['cars'],
    baseQuery:fetchBaseQuery({baseUrl:"https://car-rental-reservation-system-rho.vercel.app/api"}),
    endpoints:(builder) =>({

        //query all cars
        getCars :builder.query({
            query:()=>"/cars",
            providesTags:['cars']
        }),

        //query a cars
        getCar :builder.query({
            query:(id)=>`/cars/${id}`,
            providesTags:['cars']
        }),
    })
})

export const {useGetCarsQuery, useGetCarQuery} = baseApi