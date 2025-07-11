import {createSlice} from '@reduxjs/toolkit';

interface ISearchSlice {
    open: boolean;
}

const initialState: ISearchSlice = {
    open: false,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        open: state => {
            state.open = true;
        },
        close: state => {
            state.open = false;
        }
    },
});

export const {open, close} = searchSlice.actions;
export default searchSlice.reducer;
