import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BOTTOM_SHEET} from "../../contants/bottomSheet";


export interface OpenBottomSheetPayload {
    type: BOTTOM_SHEET;
    isOpen: boolean;
    width: number;
}

const initialState: OpenBottomSheetPayload = {
    type: BOTTOM_SHEET.SEARCH,
    isOpen: false,
    width: 100,
}

const bottomSheetSlice = createSlice({
    name: 'bottomSheet',
    initialState,
    reducers: {
        openBottomSheet: (state, action: PayloadAction<OpenBottomSheetPayload>) => {
            const {width, type} = action.payload;
            state.width = width;
            state.isOpen = true;
            state.type = type;
        },
        closeBottomSheet: (state) => {
            state.isOpen = false;
        },
    }
});

export const {openBottomSheet, closeBottomSheet} = bottomSheetSlice.actions;
export default bottomSheetSlice.reducer;


