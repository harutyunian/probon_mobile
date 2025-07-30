import React from 'react';
import {StyleSheet, View} from "react-native";
import {TouchableRipple, Text} from "react-native-paper";
import Icon from "../Icon/Icon";

/**
 * @property {string} [title="Reviews"] - The main title of the component.
 * @property {number} rating - The average numerical rating to display.
 * @property {number} reviewsCount - The total number of reviews.
 * @property {number} [recommendationPercent] - The percentage of travelers who recommend it. Optional.
 * @property {() => void} [onSeeAllPress] - Callback function for when "See all" is pressed. The button won't render if this is not provided.
 * @property {string} [seeAllText="See all"] - The text for the "See all" link.
 */

interface IProps {
    title?: string;
    rating: number;
    reviewsCount: number;
    recommendationPercent?: number;
    onSeeAllPress?: () => void;
    seeAllText?: string;
}


export function Reviews(props: IProps) {
    const {
        title = "Reviews",
        rating = 4.9,
        reviewsCount = 3332423,
        recommendationPercent = 99,
        onSeeAllPress = () => {
        },
        seeAllText = "See all"
    } = props;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleText}>{title}</Text>
                {onSeeAllPress && (
                    <TouchableRipple
                        onPress={onSeeAllPress}
                        style={styles.seeAllButton}
                        rippleColor="rgba(0, 0, 0, .1)"
                        borderless={true}
                    >
                        <Text style={styles.seeAllText}>{seeAllText}</Text>
                    </TouchableRipple>
                )}
            </View>

            <View style={styles.body}>
                <Text style={styles.ratingText}>{rating}</Text>
                <Icon name="starFilled" size={20} color="#FFB800" style={styles.starIcon}/>
                <View>
                    <Text style={styles.detailText}>
                        {reviewsCount} reviews
                    </Text>
                    {recommendationPercent !== undefined && (
                        <Text style={styles.detailText}>
                            Recommended by {recommendationPercent}% travelers
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderColor: "#E7E6E8",
        borderWidth: 1,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginHorizontal: 16,
        marginTop: 16
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1C1C1E',
    },
    seeAllButton: {
        borderRadius: 8,
    },
    seeAllText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '500',
        padding: 4,
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 44,
        fontWeight: 'bold',
        color: '#1C1C1E',
        marginRight: 8,
    },
    starIcon: {
        transform: [{translateY: 2}],
        marginRight: 12,
    },
    detailText: {
        fontSize: 16,
        color: '#3C3C43',
        fontWeight: '500',
        lineHeight: 22,
    },
});