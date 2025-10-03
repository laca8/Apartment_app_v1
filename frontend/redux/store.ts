import { configureStore } from "@reduxjs/toolkit";
import apartmentReducer from "./slicers/apartmentSlicer";

export const store = configureStore({
    reducer: {
        apartments: apartmentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
