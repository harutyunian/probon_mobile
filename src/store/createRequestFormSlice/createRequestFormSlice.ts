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
    form: {
        category: {label: "", value: ""},
        subCategory: {label: "", value: ""},
        rating: {ratings: []},
        propertyTypes: [],
        facilities: [],
        meals: [],
        room: {count: 1, types: []},
        requestTitle: "",
        toursEvent: "",
        visaIncluded: true,
        roomFacilitiesText: "",
        notes: "",
    }

}

const createRequestFormSlice = createSlice({
    name: "createRequestForm",
    initialState,
    reducers: {
        setCreateRequestForm(state, action: PayloadAction<Partial<IRequestState>>) {
            if (action.payload.page !== undefined) {
                state.page = action.payload.page;
            }
            if (action.payload.nextButtonDisabled !== undefined) {
                state.nextButtonDisabled = action.payload.nextButtonDisabled;
            }
            if (action.payload.disableRequest !== undefined) {
                state.disableRequest = action.payload.disableRequest;
            }
            if (action.payload.showPrevButton !== undefined) {
                state.showPrevButton = action.payload.showPrevButton;
            }
            if (action.payload.form) {
                Object.assign(state.form, action.payload.form);
            }
        },
        setCreateRequestFormField(state, action: PayloadAction<Partial<IRequestForm>>) {
            Object.assign(state.form, action.payload);
        },
        nextPage(state) {
            state.page += 1;
            if (state.page === 1) {
                state.nextButtonDisabled = true;
            }
        },
        prevPage(state) {
            if (state.page > 0) {
                state.nextButtonDisabled = false;
                state.page -= 1;
            }
        }
    }
})

export const {setCreateRequestForm, setCreateRequestFormField, nextPage, prevPage} = createRequestFormSlice.actions;
export default createRequestFormSlice.reducer;