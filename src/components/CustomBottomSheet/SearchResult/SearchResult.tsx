import {StyleSheet, View} from "react-native";
import {Text} from 'react-native-paper'
import Icon from "../../Icon/Icon";

export default function SearchResult() {
    return <View style={style.container}>
        <Icon name="search" size={15} color="gray" />
        <View style={[style.container,{justifyContent: 'space-between'}]}>
            <Text style={style.text}>asdasdasdadasdasd</Text>
            <Icon name="leftArrow" size={15} color="gray" />
        </View>
    </View>
}
const style = StyleSheet.create({
    container: {
        width: '100%',
        height: 48,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 16
    },
    text:{
        fontSize: 16,
        fontWeight: '500',
    }
})