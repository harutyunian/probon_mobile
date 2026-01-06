import {IRequestState} from "../../types/requestFormSlice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type IRequestForm = IRequestState['form'];

const initialState: IRequestState = {
    page: 0,
    showPrevButton: false,
    nextButtonDisabled: true,
    disableRequest: true,
    disableProperty: true,
    disableReview: true,
    form:{
        category: {label:"", value:""},
        subCategory:{label:"", value:""}
    }

}

const createRequestFormSlice = createSlice({
    name: "createRequestForm",
    initialState,
    reducers: {
        setCreateRequestForm(state, action: PayloadAction<Partial<IRequestState>>) {
            return {
                ...state,
                ...(action.payload.page !== undefined && { page: action.payload.page }),
                ...(action.payload.nextButtonDisabled !== undefined && { nextButtonDisabled: action.payload.nextButtonDisabled }),
                ...(action.payload.disableRequest !== undefined && { disableRequest: action.payload.disableRequest }),
                ...(action.payload.showPrevButton !== undefined && { showPrevButton: action.payload.showPrevButton }),
                ...(action.payload.form && { form: { ...state.form, ...action.payload.form } })
            }
        },
        setCreateRequestFormField(state, action: PayloadAction<Partial<IRequestForm>>) {
            return {
                ...state,
                form: { ...state.form, ...action.payload }
            }
        },
        nextPage(state) {
            state.page += 1;
        },
        prevPage(state) {
            if (state.page > 0) {
                state.page -= 1;
            }
        }
    }
})

export const {setCreateRequestForm, setCreateRequestFormField, nextPage, prevPage} = createRequestFormSlice.actions;
export default createRequestFormSlice.reducer;