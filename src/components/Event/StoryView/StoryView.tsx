import {StyleSheet, Text} from 'react-native';
import {ImageBackground} from "expo-image";
import {IMAGES_LIST} from "../../../mock/mock";


export default function StoryView() {
    return <ImageBackground
        resizeMode={"contain"}
        source={{uri: IMAGES_LIST[0]}}
        style={style.container}
    >

    </ImageBackground>;
}

const style= StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: "#000",
    }
})