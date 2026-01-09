import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import RequestDetailsForm from "./Screens/RequestDetailsForm/RequestDetailsForm";
import {nextPage, prevPage} from "../../store/createRequestFormSlice/createRequestFormSlice";
import {
    Tabs,
    TabScreen,
    TabsProvider,
    useTabNavigation
} from 'react-native-paper-tabs';
import SelectCategory from "./Screens/SelectCategory/SelectCategory";
import PropertyForm from "./Screens/PropertyForm/PropertyForm";
import {memo, useCallback, useMemo} from "react";
import Review from "./Screens/Review/Review";

const SelectCategoryMemo = memo(SelectCategory);
const RequestDetailsFormMemo = memo(RequestDetailsForm);
const PropertyFormMemo = memo(PropertyForm);
const ReviewMemo = memo(Review);

const TabsContent = memo(() => {
    const {disableProperty, disableRequest, disableReview} = useAppSelector(state => state.createRequestForm)
    return (
        <Tabs>
            <TabScreen label="Category">
                <SelectCategoryMemo/>
            </TabScreen>
            <TabScreen label="Request" disabled={disableProperty}>
                <RequestDetailsFormMemo/>
            </TabScreen>
            <TabScreen label="Property" disabled={disableRequest}>
                <PropertyFormMemo/>
            </TabScreen>
            <TabScreen label="Review" disabled={disableReview}>
                <ReviewMemo/>
            </TabScreen>
        </Tabs>
    );
});

TabsContent.displayName = 'TabsContent';

export function CreateRequestContent() {
    // Separate selectors to prevent re-renders when form fields change
    const nextButtonDisabled = useAppSelector(state => state.createRequestForm.nextButtonDisabled);
    const page = useAppSelector(state => state.createRequestForm.page);
    const isLastTab = page >= 3; // 4 tabs: 0-3

    const dispatch = useAppDispatch();
    const goToTab = useTabNavigation()

    const handlePressNext = useCallback(() => {
        if (isLastTab) {
            // TODO: trigger submit/create request flow here
            return;
        }
        dispatch(nextPage());
        goToTab(page + 1);
    }, [dispatch, goToTab, page, isLastTab]);

    const handlePressBack = useCallback(() => {
        dispatch(prevPage());
        goToTab(page - 1);
    }, [dispatch, goToTab, page]);

    const showBackButton = useMemo(() => page >= 1, [page])

    return (
        <>
            <TabsContent/>
            <View style={styles.container}>
                {showBackButton && <Button
                    onPress={handlePressBack}
                    style={[styles.nextButton, {width: "30%"}]}
                    mode="outlined"
                >Back
                </Button>}
                <Button
                    onPress={handlePressNext}
                    disabled={nextButtonDisabled}
                    style={[styles.nextButton, {width: showBackButton ? "50%" : "90%"}]}
                    mode="contained"
                >{isLastTab ? "Create request" : "Next"}
                </Button>
            </View>
        </>
    )

}

export function CreateRequestPage() {
    return <TabsProvider defaultIndex={0}>
        <CreateRequestContent/>
    </TabsProvider>

}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    nextButton: {
        marginBottom: 20,
        marginHorizontal: 16
    }
})