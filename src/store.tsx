import {configureStore} from "@reduxjs/toolkit";
import {roomApi} from "./services/roomApi";
import {screenApi} from "./services/screenApi";
import {calendarApi} from "./services/calendarApi";
import {pokemonApi} from "./services/pokemon";
import { setupListeners } from '@reduxjs/toolkit/query'
import {tBarApi} from "./services/tBarApi";


export const store = configureStore({
    reducer: {
        [calendarApi.reducerPath]: calendarApi.reducer,
        [roomApi.reducerPath]: roomApi.reducer,
        [tBarApi.reducerPath]: tBarApi.reducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            calendarApi.middleware,
            roomApi.middleware,
            tBarApi.middleware,
            pokemonApi.middleware
        )

});

setupListeners(store.dispatch)



