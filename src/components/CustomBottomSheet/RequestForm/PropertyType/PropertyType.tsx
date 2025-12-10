import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import Icon from "../../../Icon/Icon";
import {Button} from "react-native-paper";
import CustomCheckBox from "../../../CustomCheckBox/CustomCheckBox";


const data = [
    { label: "Apartment", value: "Apartment" },
    { label: "Hotel", value: "Hotel" },
    { label: "Villa", value: "Villa" },
    { label: "Resort", value: "Resort" },
    { label: "Hostel", value: "Hostel" },
    { label: "Motel", value: "Motel" },
    { label: "Cottage", value: "Cottage" },
    { label: "Lodge", value: "Lodge" },
];


export default function PropertyType() {
    const handleChange = (r)=> {
        console.log(r);
    }

    return <View>
        <View>
            <View style={styles.heading}>
                <TouchableOpacity>
                    <Icon name="close" size={14} color="grey"/>
                </TouchableOpacity>
                <Text>Rating</Text>
                <Button mode="text">
                    Save
                </Button>
            </View>
        </View>
        <ScrollView>
            <CustomCheckBox
                onChange={handleChange}
                data={data}
                multiSelect
            />
        </ScrollView>
    </View>
}
const styles = StyleSheet.create({
    container: {},
    heading: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        paddingVertical: 14,
        paddingHorizontal: 4,
    }
})