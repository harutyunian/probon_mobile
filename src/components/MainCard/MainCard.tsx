import {Image, View, StyleSheet, useWindowDimensions, Pressable} from "react-native";
import {Button, Text, useTheme} from 'react-native-paper';
import Icon from "../Icon/Icon";
import {Sticker} from "../Sticker/Sticker";
import {ImageCarousel} from "../ImageCarousel/ImageCarousel";
import {mockPackageDetailsPackP} from "../../pages/PackageDetails/mock";
import {MAIN_ROUTES} from "../../contants/routes";
import {useNavigation} from "@react-navigation/native";

export function MainCard() {
    const theme = useTheme();
    const {images} = mockPackageDetailsPackP;
    const navigation = useNavigation();

    const handlePress = () => {
        //@ts-ignore
        navigation.navigate(MAIN_ROUTES.PUBLIC.DETAILS.NAME);
    }
    return (
        <Pressable
            style={[{width: 182, marginBottom: 20}]}
            onPress={handlePress}
        >
            <View>
                <ImageCarousel
                    images={images}
                    imageWidth={182}
                    height={180}
                    imageContainerStyle={styles.carouselContainer}
                />
                <Sticker type='springSale' containerStyle={styles.sticker}/>
                <View style={styles.wishContainer}>
                    <Icon name={"heart"} size={20} color={theme.colors.primary}/>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title} numberOfLines={1}>Sri Lanka Shangri-la</Text>
                <Text variant="bodyMedium">12-24 Dec</Text>
                <View style={styles.reviewContainer}>
                    <Text>4.6 </Text>
                    <Icon name={'starFilled'} size={15} color="#FFCC00"/>
                    <Text> 9 review</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>$245</Text>
                    <Button
                        mode="contained"
                        style={styles.button}
                        contentStyle={styles.buttonContent}
                        labelStyle={styles.buttonLabel}
                    >
                        Buy
                    </Button>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexBasis: '48%',
        marginVertical: 15,
    },
    carouselContainer: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    sticker: {
        position: 'absolute',
        bottom: 40,
        left: 8,
    },
    wishContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: 32,
        height: 32,
        backgroundColor: '#EFEDFD',
        top: 8,
        right: 8,
        borderRadius: 16,
    },
    contentContainer: {
        paddingHorizontal: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    reviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    priceContainer: {
        rowGap: 8,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: '500',
    },
    button: {
        width: '100%', // here is button style
    },
    buttonContent: {
        height: 32,
        paddingHorizontal: 8,
    },
    buttonLabel: {
        fontSize: 12,
        marginVertical: 0,
    },
});