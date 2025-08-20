import {BOTTOM_SHEET} from "../../store/bottomSheetSlice/types";
import React from "react";
import StoryView from "../Event/StoryView/StoryView";
import Search from "./Search/Search"


// rendering bottom sheet content deps on type
const BottomSheetContent = ({type, props}: any) => {
    switch (type) {
        case BOTTOM_SHEET.STORY_VIEW:
            return <StoryView {...props} />;

        case BOTTOM_SHEET.SEARCH:
            return <Search {...props} />;

        default:
            return <Search {...props} />;
    }
};

export default BottomSheetContent;