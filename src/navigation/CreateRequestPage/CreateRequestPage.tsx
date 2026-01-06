import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import RequestDetailsForm from "./Screens/RequestDetailsForm/RequestDetailsForm";
import {nextPage} from "../../store/createRequestFormSlice/createRequestFormSlice";
import {
    Tabs,
    TabScreen,
    TabsProvider,
    useTabNavigation
} from 'react-native-paper-tabs';
import SelectCategory from "./Screens/SelectCategory/SelectCategory";
import PropertyForm from "./Screens/PropertyForm/PropertyForm";


export function CreateRequestContent() {
    const {
        nextButtonDisabled,
        disableRequest,
        disableProperty,
        disableReview,
        page
    } = useAppSelector(state => state.createRequestForm);
    const dispatch = useAppDispatch();
    const goToTab = useTabNavigation()

    const handlePressNext = () => {
        dispatch(nextPage());
        goToTab(page + 1);
    }


    return (<><Tabs>
        <TabScreen label="Category">
            <SelectCategory/>
        </TabScreen>
        <TabScreen label="Request" disabled={disableRequest}>
            <RequestDetailsForm/>
        </TabScreen>
        <TabScreen label="Property" disabled={disableProperty}>
            <PropertyForm/>
        </TabScreen>
        <TabScreen label="Review" disabled={disableReview}>
            <RequestDetailsForm/>
        </TabScreen>
    </Tabs>
        <Button
            onPress={handlePressNext}
            disabled={nextButtonDisabled}
            style={styles.nextButton}
            mode="contained"
        >Next
        </Button>
    </>)

}

export function CreateRequestPage() {
    return <TabsProvider defaultIndex={0}>
        <CreateRequestContent/>
    </TabsProvider>

}

const styles = StyleSheet.create({

    nextButton: {
        marginBottom: 20,
        marginHorizontal: 16
    }
})