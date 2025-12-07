

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

export  interface IRequestState {
    page: number;
    nextButtonDisabled: boolean;
    showPrevButton: boolean;
    form:{
        category: IRequestFormCategory;
        subCategory: IRequestFormCategory;
        dateRange?: IDateRange;
        passengers?: IPassengerCounts;
        tourismType?: ITourismType;
        isGroupTour?: boolean;
    }
}