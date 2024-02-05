import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {IToolbar} from '../models/toolbar.model'

export const tBarApi = createApi({
    reducerPath: 'toolbarApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api'}),
    endpoints: (builder) => ({
        getToolbar: builder.query<IToolbar, number>({
            query: (id) => `/toolbar-status/${id}`,
        }),

        updateToolbar: builder.mutation({
            query: (data) => ({
                url: `/toolbar-status/${data.id}`,
                method: 'PUT',
                body: data
            }),

        }),
    }),
})

export const {useGetToolbarQuery, useUpdateToolbarMutation} = tBarApi
