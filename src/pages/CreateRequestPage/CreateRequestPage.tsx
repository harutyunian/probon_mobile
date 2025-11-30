import {StyleSheet,View} from 'react-native';
import {Button} from 'react-native-paper';
import SelectCategory from "./Screens/SelectCategory/SelectCategory";
import {useAppSelector} from "../../hooks/redux";


export function CreateRequestPage() {
    const {nextButtonDisabled} = useAppSelector(state => state.createRequestForm);


    return <View style={styles.container}>
        <SelectCategory/>
        <Button disabled={nextButtonDisabled} style={styles.nextButton} mode="contained">Next</Button>
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