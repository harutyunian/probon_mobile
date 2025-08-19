import {StyleSheet, Text, View} from "react-native";
import {ImageBackground} from "expo-image";
import {IMAGES_LIST} from "../../mock/mock";

export default function Event2() {
    return <View>
        <ImageBackground
            style={style.container}
            imageStyle={{borderRadius: 8}}
            source={{uri: IMAGES_LIST[0]}}
            cachePolicy="memory-disk"
        >
            <Text style={style.text}>Event2</Text>
        </ImageBackground>
    </View>
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: 112,
        height: 140,
        borderRadius: 8,
        justifyContent: "flex-end",
        padding: 6,
    },
    text: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
    },
})