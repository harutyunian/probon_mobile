import {configureStore} from '@reduxjs/toolkit';
import searchSlice from "./searchSlice/searchSlice";
import bottomSheetSlice from "./bottomSheetSlice/bottomSheetSlice";
import createRequestFormSlice from "./createRequestFormSlice/createRequestFormSlice";

export const store = configureStore({
    reducer: {
        search: searchSlice,
        bottomSheet: bottomSheetSlice,
        createRequestForm: createRequestFormSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
