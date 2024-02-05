import {IRoom} from "../models/room.model";
import {baseApiSlice} from "./baseApiSlice";

const _roomApi =baseApiSlice.enhanceEndpoints({addTagTypes:['Room']})
export const roomApi = _roomApi.injectEndpoints({

    endpoints: (builder) => (
        {
            getAllRoom: builder.query<IRoom[], void>({
                query: () => `/room`,
            }),

            addRoom: builder.mutation<void, IRoom>({
                query: room => ({
                    url: `/room`,
                    method: 'POST',
                    body: {...room}
                }),

            }),

            deleteRoom: builder.mutation<void,number>({
                query:(roomId)=>({
                    url: `/room/${roomId}`,
                    method: 'DELETE',
                })
            })

        })
})

export const {
    useGetAllRoomQuery,
    useAddRoomMutation,
    useDeleteRoomMutation
} = roomApi;
