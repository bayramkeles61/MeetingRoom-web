import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery =  fetchBaseQuery({baseUrl: "/api",
    prepareHeaders: (headers : Headers) => {
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS, PUT, PATCH");
        return headers;
    }
})

export const baseApiSlice = createApi({
    baseQuery : baseQuery,
    endpoints : (builder : any) => ({})
})
