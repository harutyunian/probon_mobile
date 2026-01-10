import { BOTTOM_SHEET } from "../../store/bottomSheetSlice/types";
import React, { memo } from "react";
import Search from "./Search/Search";
import Passenger from "./RequestForm/Passenger/Passenger";
import DatePicker from "./RequestForm/DatePicker/DatePicker";
import TourismType from "./RequestForm/TourismType/TourismType";
import { PricerRange } from "./RequestForm/PricerRange/PricerRange";
import Rating from "./RequestForm/Rating/Rating";
import PropertyType from "./RequestForm/PropertyType/PropertyType";
import Facilities from "./RequestForm/Facilities/Facilities";
import Room from "./RequestForm/Room/Room";
import Meals from "./RequestForm/Meals/Meals";
import CategorySelector from "./RequestForm/CategorySelector/CategorySelector";

interface BottomSheetContentProps {
    type: BOTTOM_SHEET;
}

const BottomSheetContent = ({ type }: BottomSheetContentProps) => {
    switch (type) {
        case BOTTOM_SHEET.SEARCH:
            return <Search />;
        case BOTTOM_SHEET.SELECT_PASSENGER:
            return <Passenger />;
        case BOTTOM_SHEET.DATE_PICKER:
            return <DatePicker />;
        case BOTTOM_SHEET.TOURISM_TYPE:
            return <TourismType />;
        case BOTTOM_SHEET.PRICE_RANGE:
            return <PricerRange />;
        case BOTTOM_SHEET.RATING:
            return <Rating />;
        case BOTTOM_SHEET.PROPERTY_TYPE:
            return <PropertyType />;
        case BOTTOM_SHEET.FACILITIES:
            return <Facilities />;
        case BOTTOM_SHEET.ROOM:
            return <Room />;
        case BOTTOM_SHEET.MEALS:
            return <Meals />;
        case BOTTOM_SHEET.CATEGORY_SELECT:
            return <CategorySelector isSubcategory={false} />;
        case BOTTOM_SHEET.SUBCATEGORY_SELECT:
            return <CategorySelector isSubcategory={true} />;
        default:
            return <Search />;
    }
};

export default memo(BottomSheetContent);