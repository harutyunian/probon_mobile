import {StyleSheet,View} from 'react-native';
import {Button} from 'react-native-paper';
import SelectCategory from "./Screens/SelectCategory/SelectCategory";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import RequestDetailsForm from "./Screens/RequestDetailsForm/RequestDetailsForm";
import {nextPage} from "../../store/createRequestFormSlice/createRequestFormSlice";


export function CreateRequestPage() {
    const {nextButtonDisabled, page} = useAppSelector(state => state.createRequestForm);
    const dispatch = useAppDispatch();

    const handlePressNext = () =>{
        dispatch(nextPage());
    }

    return <View style={styles.container}>
        {/*{page === 0 && <SelectCategory/>}*/}
        {/*{page === 1 && <RequestDetailsForm/>}*/}
        <RequestDetailsForm/>
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
    container:{
        flex: 1,
    },
    nextButton: {
        marginBottom: 20,
        marginHorizontal: 16
    }
})