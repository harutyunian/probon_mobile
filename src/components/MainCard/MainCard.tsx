import { Image, View, StyleSheet, useWindowDimensions } from "react-native";
import {Button, Text, useTheme} from 'react-native-paper';
import { useMemo } from "react";
import Icon from "../Icon/Icon";
import { Sticker } from "../Sticker/Sticker";
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";
import { mockPackageDetailsPackP } from "../../pages/PackageDetails/mock";

export function MainCard() {
    const { width } = useWindowDimensions();
    const theme = useTheme();
    const { images } = mockPackageDetailsPackP;

    const cardWidth = useMemo(() => width * 0.44, [width]);

    return (
        <View style={[styles.container, { width: cardWidth }]}>
            <View>
                <ImageCarousel
                    images={images}
                    imageWidth={cardWidth}
                    height={180}
                    imageContainerStyle={styles.carouselContainer}
                />
                <Sticker type='springSale' containerStyle={styles.sticker} />
                <View style={styles.wishContainer} >
                    <Icon name={"heart"} size={20} color={theme.colors.primary}/>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title} numberOfLines={1}>Sri Lanka Shangri-la</Text>
                <Text variant="bodyMedium">12-24 Dec</Text>
                <View style={styles.reviewContainer}>
                    <Text>4.6 </Text>
                    <Icon name={'starFilled'} size={15} color="#FFCC00" />
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
        </View>
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
        width: '100%',
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