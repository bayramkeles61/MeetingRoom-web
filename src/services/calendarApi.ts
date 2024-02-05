import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {IToken} from "../models/token.model";
import {IAzure} from "../models/azure.model";

// Define a service using a base URL and expected endpoints
export const calendarApi = createApi({
    reducerPath: 'calendarApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers : Headers) => {
            headers.set('Code', '586');
            headers.set('Content-Type', 'application/json');
            headers.set('Access-Control-Allow-Origin', '*');
            headers.set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS, PUT, PATCH");
            return headers;
        }
    }),

    endpoints: (builder) => ({
        getAllAzure: builder.query<IAzure, void>({
            query: () => `/calendar/fifth`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllAzureQuery } = calendarApi
