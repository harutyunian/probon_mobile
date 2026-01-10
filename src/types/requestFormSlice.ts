

export interface IRequestFormCategory {
    label: string;
    value: string;
}

export interface IDateRange {
    startDate: string | null; // ISO date string for Redux serialization
    endDate: string | null; // ISO date string for Redux serialization
}

export interface IPassengerCounts {
    adults: number;
    children: number;
    infants: number;
}

export interface ITourismType {
    type: string;
    value: string;
}

export interface IPriceRange {
    min: number;
    max: number;
}

export interface IPropertyTypeOption {
    label: string;
    value: string;
}

export interface IFacilityOption {
    label: string;
    value: string;
}

export interface IMealOption {
    label: string;
    value: string;
}

export interface IRoomOption {
    label: string;
    value: string;
}

export interface IRoomSelection {
    count: number;
    types: IRoomOption[];
}

export interface IRating {
    ratings: number[]; // Array of selected star ratings (e.g., [5, 4, 3])
}

export  interface IRequestState {
    page: number;
    nextButtonDisabled: boolean;
    showPrevButton: boolean;
    disableRequest: boolean,
    disableProperty: boolean,
    disableReview: boolean,
    form:{
        category: IRequestFormCategory;
        subCategory: IRequestFormCategory;
        dateRange?: IDateRange;
        passengers?: IPassengerCounts;
        tourismType?: ITourismType;
        isGroupTour?: boolean;
        priceRange?: IPriceRange;
        rating?: IRating;
        propertyTypes?: IPropertyTypeOption[];
        facilities?: IFacilityOption[];
        meals?: IMealOption[];
        room?: IRoomSelection;
        requestTitle?: string;
        toursEvent?: string;
        visaIncluded?: boolean;
        roomFacilitiesText?: string;
        notes?: string;
    }
}