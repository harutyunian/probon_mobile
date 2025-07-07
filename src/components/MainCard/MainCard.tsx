import {Image, View} from "react-native";
import {Surface, Button, Card, Text} from 'react-native-paper';
import {StyleSheet, useWindowDimensions} from "react-native";
import {useMemo} from "react";
import Icon from "../Icon/Icon";
import {Sticker} from "../Sticker/Sticker";


export function MainCard() {
    const {width} = useWindowDimensions();

    const cardWidth = useMemo(() => {
        return {width: width * 0.44};
    }, [])


    return <View style={[styles.container, {width: cardWidth.width}]}>
        <Image
            style={[styles.cover, {height: cardWidth.width * 1.01}]}
            source={{uri: 'https://picsum.photos/700'}}
        />
        <Sticker  type='springSale' containerStyle={[{top: -30, left: 7}]}/>
        <View>
            <Text style={[styles.title]}>Sri Lanka Shangri-la</Text>
            <Text variant="bodyMedium">12-24 Dec</Text>
            <View style={[styles.reviewContainer]}>
                <Text>4.6 </Text><Icon name={'starFilled'} size={15} color="#FFCC00"/><Text> 9 review</Text>
            </View>
            <Text style={[styles.price]}>$245</Text>
        </View>
        <View >
            <Button
                mode="contained"
                style={styles.button}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
            >Buy</Button>
        </View>
    </View>
}

const styles = StyleSheet.create({

    container: {
        marginTop: 15,
        marginBottom: 30,
        height: 300,
    },

    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    price: {
        fontSize: 16,
        fontWeight: '500',
    },
    reviewContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bodyTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: "#74717A"
    },
    cover: {
        marginTop: 10,
        borderRadius: 8,
    },
    button: {
        marginTop: 12,
        width: '100%',
    },
    buttonContent: {
        height: 32,
    },
    buttonLabel: {
        fontSize: 12,
        marginVertical: 0,
    },
})