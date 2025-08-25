import {configureStore} from '@reduxjs/toolkit';
import searchSlice from "./searchSlice/searchSlice";
import bottomSheetSlice from "./bottomSheetSlice/bottomSheetSlice";

export const store = configureStore({
    reducer: {
        search: searchSlice,
        bottomSheet: bottomSheetSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
