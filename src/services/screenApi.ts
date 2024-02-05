import {baseApiSlice} from "./baseApiSlice";
import {IScreen} from "../models/screen.model";
import {log} from "util";
import {IEwsIntegration} from "../models/ewsIntegration.model";


const _playerApi = baseApiSlice.enhanceEndpoints({addTagTypes: ['Screen']})
export const screenApi = _playerApi.injectEndpoints({

    endpoints: (builder) => (
        {
            getAllScreens: builder.query<IScreen[], void>({
                query: () => `/screens`,
            }),

            getScreensById: builder.query<IScreen, string>({
                query: (screenId) => `/screens/${screenId}`
            }),

            addScreen: builder.mutation<void, IScreen>({
                query: screen => ({
                    url: `/screens`,
                    method: 'POST',
                    body: screen
                }),
            }),

            getScreensByRoomId: builder.query<IScreen[], string>({
                query: (roomId) => `/room/${roomId}/screens`
            }),

            deleteScreen: builder.mutation<void, number>({
                query: (screenId) => ({
                    url: `/screens/${screenId}`,
                    method: 'DELETE',
                })
            }),

            getEwsIntegration: builder.query<IEwsIntegration, string>({
                query: (screenId) => `/screens/${screenId}/ews`
            }),

            updateEwsIntegration: builder.mutation<void, IEwsIntegration>({
                query: ews => ({
                    url: `/screens/${ews.screenId}/ews`,
                    method: 'POST',
                    body: ews
                }),
            })


        })
})

export const {
    useGetAllScreensQuery,
    useGetScreensByIdQuery,
    useAddScreenMutation,
    useGetScreensByRoomIdQuery,
    useDeleteScreenMutation,
    useGetEwsIntegrationQuery,
    useUpdateEwsIntegrationMutation

} = screenApi;
