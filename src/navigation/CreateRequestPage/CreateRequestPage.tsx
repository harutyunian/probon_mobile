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
import {withDecay} from "react-native-reanimated";
import {useMemo} from "react";


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

    const handlePressBack = () => {
        dispatch(prevPage());
        goToTab(page - 1);
    }

    const showBackButton = useMemo(() => page >= 1, [page])

    return (<><Tabs>
        <TabScreen label="Category">
            <SelectCategory/>
        </TabScreen>
        <TabScreen label="Request">
            <RequestDetailsForm/>
        </TabScreen>
        <TabScreen label="Property">
            <PropertyForm/>
        </TabScreen>
        <TabScreen label="Review">
            <RequestDetailsForm/>
        </TabScreen>
    </Tabs>
        <View style={styles.container}>
            {showBackButton && <Button
                onPress={handlePressBack}
                disabled={nextButtonDisabled}
                style={[styles.nextButton, {width: "30%"}]}
                mode="outlined"
            >Back
            </Button>}
            <Button
                onPress={handlePressNext}
                disabled={nextButtonDisabled}
                style={[styles.nextButton, {width: showBackButton ? "50%" : "90%"}]}
                mode="contained"
            >Next
            </Button>
        </View>
    </>)

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