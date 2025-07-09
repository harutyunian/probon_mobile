import {View, Text, StyleSheet, Dimensions} from "react-native";
import {ImageBackground} from "expo-image";
import {useMemo} from "react";


const backgroundImage = "https://www.citalia.com/-/media/Bynder/Citalia-destinations/Italy/Cities/Venice/Venice-2024-Gondola-Rialto-Bridge-Shutterstock-2162340095-Hybris.jpg?rev=72d18c18d0844dada8e26f7ac3e01be7&hash=4AE7EF8622D664527B600BE3B4270A2D&h=480.375&w=1081.5";
const img1 = 'https://i.natgeofe.com/k/e9781357-7abe-4d48-96d2-1151d9fd265a/italy-coliseum.jpg?wp=1&w=1084.125&h=609';
const img2 = 'https://hips.hearstapps.com/hmg-prod/images/madrid-holiday-guide-1673213485.jpg';
const img3 = "https://cloudinary.fclmedia.com/fctg/image/fetch/w_1600,c_fill,q_auto,g_auto,fl_progressive/https://cloudinary.fclmedia.com/fctg/image/fetch/q_80,w_600,g_auto,c_fill,f_jpg,fl_progressive/https://smartcdn.dam.gettyimages.com/EZ72ETKZ/at/kn39qbqst6hjs3zk4rhr8ks/Barcelona_LaSagradaFamilia_1000x666.jpg";
const img4 = 'https://www.mensjournal.com/.image/t_share/MTk2MTM3NDU2NTM2NzI0OTk3/1380-eiffel-tower.jpg';


const arrImg = [
    backgroundImage,
    img1, img2, img3, img4
]

function getRandomItem(arr: any = arrImg) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

export default function Event() {
    return <ImageBackground
        source={{uri: getRandomItem()}}
        style={[styles.container]}
        imageStyle={styles.image}
    >
        <Text style={styles.text}>Evento</Text>
    </ImageBackground>
}

const styles = StyleSheet.create({
    container: {
        borderStyle: 'solid',
        borderColor: 'transparent',
        borderWidth: 1,
        width: 112,
        height: 140,

        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 8,
    },
    image: {
        borderRadius: 8,
    },
    text: {
        color: 'white',
        fontWeight: '900',
        fontSize: 14,
    }
})