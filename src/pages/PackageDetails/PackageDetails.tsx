import {View, StyleSheet, Animated} from "react-native";
import {Text, useTheme} from 'react-native-paper';

import {ImageCarousel} from "../../components/ImageCarousel/ImageCarousel";
import {mockPackageDetailsPackP} from "./mock";
import Icon from "../../components/Icon/Icon";
import {useNavigation} from "@react-navigation/native";
import ScrollView = Animated.ScrollView;

interface IPackageDetails {
    images?: string[];
}

export function PackageDetails() {
    const {images, title, locationName, rating, description} = mockPackageDetailsPackP
    const navigation = useNavigation<any>();
    const theme = useTheme();

    const Rating = () => {
        const stars = Array.from({length: 5}, (_, index) => {
            const isFilled = index < rating;
            return (
                <Icon
                    key={index}
                    name={"starFilled"}
                    size={24}
                    color={isFilled ? 'gold' : 'gray'}
                />
            );
        });
        return <View style={style.ratingContainer}>{stars}</View>
    }

    const renderDetailsRow = (label: string, value: string | React.ReactNode) => {
        return <View style={style.detailsWrapper}>
            {/*todo: es textSecondary tkroe petqa haskananq inch enq anum vortev typei xndir a talis, es pahin zut sents eli */}
            {/*@ts-ignore*/}
            <Text style={[{color: theme.colors.textSecondary}, style.detailsRowLabel]}>{label}</Text>
            <Text>{value}</Text>
        </View>
    }

    return <ScrollView>
        <ImageCarousel images={images}/>
        <View style={[style.partnerInfoContainer, style.container, style.hr]}>
            <Text style={style.textSmallL}>OceanAir Travel</Text>
            <Text style={style.title}>{title}</Text>
            <View style={style.location}>
                <Icon name="locationIcon" width={"10"} color={'grey'}/>
                <Text style={style.textSmallL}>{locationName}</Text>
            </View>
            <Rating/>
            <Text style={style.description}>{description}</Text>
        </View>
        <View style={style.detailsContainer}>
            {renderDetailsRow("Availability", "Jul 3 - Jul 12")}
            {renderDetailsRow("Duration", "7 days 6 nights")}
            {renderDetailsRow("Tourism type", "Cultural")}
            {renderDetailsRow("Ages", "3-80 , max of 15 per group")}
            {renderDetailsRow("Hotel", "Marriot 5")}
        </View>
        <View/>
    </ScrollView>
}

const style = StyleSheet.create({
    container: {
        padding: 16,
        width: "100%"
    },
    detailsContainer:{
      rowGap: 16,
    },
    detailsRowLabel: {
        fontSize: 16,
    },
    detailsRow: {
        fontWeight: "500",
    },
    detailsWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    description: {
        fontSize: 16,
        fontWeight: "400",
        color: "#74717A",
    },
    ratingContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        color: "#171321",
        fontSize: 20,
        fontWeight: "500",

    },
    location: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10
    },
    hr: {
        borderBottomWidth: 1,
        borderBottomColor: '#E7E6E8',
        marginVertical: 8,
    },

    partnerInfoContainer: {
        rowGap: 10,
    },
    textSmallL: {
        color: "#74717A",
        fontSize: 12,
        fontWeight: "500"
    }
})