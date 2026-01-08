import {BOTTOM_SHEET} from "../../store/bottomSheetSlice/types";
import React from "react";
import Search from "./Search/Search"
import Passenger from "./RequestForm/Passenger/Passenger";
import DatePicker from "./RequestForm/DatePicker/DatePicker";
import TourismType from "./RequestForm/TourismType/TourismType";
import {PricerRange} from "./RequestForm/PricerRange/PricerRange";
import Rating from "./RequestForm/Rating/Rating";
import PropertyType from "./RequestForm/PropertyType/PropertyType";
import CategorySelector from "./RequestForm/CategorySelector/CategorySelector";


// rendering bottom sheet content deps on type
const BottomSheetContent = ({type, props}: any) => {
    switch (type) {
        case BOTTOM_SHEET.SEARCH:
            return <Search {...props}  />;
        case BOTTOM_SHEET.SELECT_PASSENGER:
            return <Passenger {...props}/>
        case BOTTOM_SHEET.DATE_PICKER:
            return <DatePicker {...props} />;
        case BOTTOM_SHEET.TOURISM_TYPE:
            return <TourismType {...props}/>;
        case BOTTOM_SHEET.PRICE_RANGE:
            return <PricerRange {...props} />;
        case BOTTOM_SHEET.RATING:
            return <Rating {...props} />;
        case BOTTOM_SHEET.PROPERTY_TYPE:
            return <PropertyType {...props} />;
        case BOTTOM_SHEET.CATEGORY_SELECT:
            return <CategorySelector {...props} isSubcategory={false} />;
        case BOTTOM_SHEET.SUBCATEGORY_SELECT:
            return <CategorySelector {...props} isSubcategory={true} />;
        default:
            return <Search {...props} />;
    }
};

export default BottomSheetContent;