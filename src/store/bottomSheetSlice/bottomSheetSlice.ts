import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BOTTOM_SHEET} from "./types";


export interface OpenBottomSheetPayload {
    type: BOTTOM_SHEET;
    isOpen?: boolean;
    height?: string; // Optional: if not provided, content will determine height
}

const initialState: OpenBottomSheetPayload = {
    type: BOTTOM_SHEET.SEARCH,
    isOpen: false,
    height: undefined,
}

const bottomSheetSlice = createSlice({
    name: 'bottomSheet',
    initialState,
    reducers: {
        openBottomSheet: (state, action: PayloadAction<OpenBottomSheetPayload>) => {
            const {height, type} = action.payload;
            state.type = type;
            state.isOpen = true;
            state.height = height;
        },
        closeBottomSheet: (state) => {
            state.isOpen = false;
        },
    }
});

export const {openBottomSheet, closeBottomSheet} = bottomSheetSlice.actions;
export default bottomSheetSlice.reducer;


