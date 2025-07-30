import {View, StyleSheet, ScrollView} from "react-native";
import {Image} from "expo-image";
import {Avatar, Text, useTheme} from 'react-native-paper';
import Icon from "../../components/Icon/Icon";
import {ContactInfo} from "./ContactInfo/ContactInfo";
import {Reviews} from "../../components/Reviews/Reviews";


const avatar = "https://masterpiecer-images.s3.yandex.net/c984d697a82011ee9fee8237f3396fa1:upscaled";
const coverPhoto = "https://timelinecovers.pro/facebook-cover/download/Avatar-eye-facebook-cover.jpg";

export default function Profile() {
    const theme = useTheme();


    return <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <Image source={coverPhoto} style={styles.coverPhoto}/>
        <View style={styles.avatarWrapper}>
            <Avatar.Image
                style={styles.avatar}
                size={112}
                source={{uri: avatar}}
            />
            <View style={styles.center}>
                <Text style={styles.title}>One why tour</Text>
                <Icon name={"profileApproved"} size={18} color={theme.colors.primary}/>
            </View>
        </View>
        <View style={styles.container}>
            <Text style={styles.title}>Intro</Text>
            <Text style={styles.description}>Established in 2011, ONE WAY TOUR is an Armenian tour operator organizing
                individual and group tours in Armenia, Artsakh (Nagorno-Karabakh Republic), Georgia and suggesting tour
                packages to all the countries of the world.</Text>
           <ContactInfo/>
            <View style={[styles.center,{left: -15}]}>
                <Reviews rating={4} reviewsCount={3455} />
            </View>

            <View style={styles.contactInfo}>

            </View>
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    coverPhoto: {
        height: 150,
        width: "100%",
    },
    contactInfo: {},
    description: {
        color: "#45424D",
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 24,
    },
    center: {
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        columnGap: 10,
    },
    avatarWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 16,
        bottom: 36,
    },
    title: {
        fontSize: 24,
        fontWeight: 500
    },
    avatar: {},
    container: {
        paddingHorizontal: 16,
    }
})