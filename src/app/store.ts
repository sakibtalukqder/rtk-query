import { configureStore } from "@reduxjs/toolkit";
import { ContextApi } from "../Api/ContextApi";


export const store = configureStore({
    
    reducer: {
        [ContextApi.reducerPath]: ContextApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ContextApi.middleware),

})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;