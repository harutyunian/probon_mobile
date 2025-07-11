// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import searchSlice from "./searchSlice/searchSlice";

export const store = configureStore({
    reducer: {
        search: searchSlice,
    },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
