import {View, Text, StyleSheet} from "react-native";
import {TextInput, useTheme, Checkbox} from 'react-native-paper';
import {useAppDispatch} from "../../../../hooks/redux";
import {openBottomSheet} from "../../../../store/bottomSheetSlice/bottomSheetSlice";
import {BOTTOM_SHEET} from "../../../../store/bottomSheetSlice/types";

export default function RequestDetailsForm() {
   const theme = useTheme();
    const dispatch = useAppDispatch();

   const handlePressPeople = () =>{
       dispatch(openBottomSheet({type:BOTTOM_SHEET.SELECT_PASSENGER, width: "38%"}))
   }

    return <View style={styles.container}>
         <TextInput
            style={styles.textInput}
                mode="outlined"
                placeholder="Request title"
                label="Request title"
                left={<TextInput.Icon icon="format-title"/>}
        />
        <TextInput
            onPress={handlePressPeople}
            style={styles.textInput}
            mode="outlined"
            placeholder="People"
            label="People"
            left={<TextInput.Icon icon="account"/>}
        />
        <TextInput
            style={styles.textInput}
            mode="outlined"
            placeholder="Dates"
            label="Dates"
            left={<TextInput.Icon icon="calendar-range-outline"/>}
        />
        <TextInput
            style={styles.textInput}
            mode="outlined"
            placeholder="Tourism"
            label="Types"
            left={<TextInput.Icon icon="flag-variant-outline"/>}
        />
        <TextInput
            style={styles.textInput}
            mode="outlined"
            placeholder="Tour & event"
            label="Tour & event"
            left={<TextInput.Icon icon="search-web"/>}
        />
        <TextInput
            style={styles.textInput}
            mode="outlined"
            placeholder="Price range"
            label="Price range"
            left={<TextInput.Icon icon="currency-usd"/>}
        />
        <Text>Please write price range in a currency you selected from
            <Text style={{
            color: theme.colors.primary,
                textDecorationLine: 'underline',
                fontWeight: '700'
        }}> Currency</Text>
        </Text>
        <View style={styles.visaWrapper}>
          <Checkbox.Android
                status={ "checked"}
            />
            <Text style={{ marginLeft: 8 }}>Visa Included</Text>
        </View>
    </View>
}
const styles = StyleSheet.create({
    container: {
        rowGap: 20,
        paddingHorizontal: 16,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    textInput:{
        width: '100%',
        borderRadius: 16
    },
    visaWrapper:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    }
})