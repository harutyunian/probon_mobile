import {BOTTOM_SHEET} from "../../store/bottomSheetSlice/types";
import React from "react";
import Search from "./Search/Search"
import Passenger from "./RequestForm/Passenger/Passenger";


// rendering bottom sheet content deps on type
const BottomSheetContent = ({type, props}: any) => {
    switch (type) {
        case BOTTOM_SHEET.SEARCH:
            return <Search {...props} />;
        case BOTTOM_SHEET.SELECT_PASSENGER:
            return <Passenger/>
        default:
            return <Search {...props} />;
    }
};

export default BottomSheetContent;