

export interface IRequestFormCategory {
    label: string;
    value: string;
}

export  interface IRequestState {
    page: number;
    nextButtonDisabled: boolean;
    showPrevButton: boolean;
    form:{
        category: IRequestFormCategory;
        subCategory: IRequestFormCategory;
    }
}