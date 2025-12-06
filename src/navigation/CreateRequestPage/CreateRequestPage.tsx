import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import RequestDetailsForm from "./Screens/RequestDetailsForm/RequestDetailsForm";
import {nextPage} from "../../store/createRequestFormSlice/createRequestFormSlice";
import {
    TabsProvider,
    Tabs,
    TabScreen,
} from 'react-native-paper-tabs';
import SelectCategory from "./Screens/SelectCategory/SelectCategory";


export function CreateRequestPage() {
    const {nextButtonDisabled, page} = useAppSelector(state => state.createRequestForm);
    const dispatch = useAppDispatch();

    const handlePressNext = () => {
        dispatch(nextPage());
    }

    return <View style={styles.container}>
        <TabsProvider
            defaultIndex={0}
        >
            <Tabs>
                <TabScreen label="Request">
                    <SelectCategory/>
                </TabScreen>
                <TabScreen label="Ticket">
                    <RequestDetailsForm/>
                </TabScreen>
                <TabScreen label="Property">
                    <RequestDetailsForm/>
                </TabScreen>
                <TabScreen label="Review">
                    <RequestDetailsForm/>
                </TabScreen>
            </Tabs>
        </TabsProvider>
        <Button
            onPress={handlePressNext}
            disabled={nextButtonDisabled}
            style={styles.nextButton}
            mode="contained"
        >Next
        </Button>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    nextButton: {
        marginBottom: 20,
        marginHorizontal: 16
    }
})