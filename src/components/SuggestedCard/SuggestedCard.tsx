import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Card, Text, IconButton} from 'react-native-paper';

interface SuggestedCardProps {
    image: string;
    title: string;
    peopleCount: number;
    dateRange: string;
    price: number;
    onPress?: () => void;
    onToggleFavorite?: () => void;
    isFavorite?: boolean;
}

/**
     * @typedef {Object} SuggestedCardProps
     *
     * @property {string} image - URL of the image to be displayed on the left side of the card.
     * @property {string} title - Title text shown prominently in the card.
     * @property {number} peopleCount - Number of people associated with the event/item.
     * @property {string} dateRange - Date range (e.g., "Jun 12 - Jun 14") to describe the event duration.
     * @property {number} price - Price value displayed at the bottom of the card.
     * @property {() => void} [onPress] - Callback triggered when the card is pressed. Useful for navigation.
     * @property {() => void} [onToggleFavorite] - Callback triggered when the favorite (heart) icon is pressed.
     * @property {boolean} [isFavorite=false] - Whether the item is marked as a favorite (toggles the heart icon).
 */


const SuggestedCard: React.FC<SuggestedCardProps> = (props) => {
    const {
        image,
        title,
        peopleCount,
        dateRange,
        price,
        onPress,
        onToggleFavorite,
        isFavorite = false,
    } = props
    return (
        <Card style={styles.card} onPress={onPress} mode="contained">
            <View style={styles.container}>
                <Image source={{uri: image}} style={styles.image}/>
                <View style={styles.content}>
                    <Text variant="titleMedium" style={styles.title}>{title}</Text>
                    <Text variant="bodyMedium" style={styles.subtitle}>
                        {peopleCount} person • {dateRange}
                    </Text>
                    <Text variant="titleMedium" style={styles.price}>${price}</Text>
                </View>
                <IconButton
                    icon={isFavorite ? 'heart' : 'heart-outline'}
                    iconColor="#5E4DED"
                    size={20}
                    onPress={onToggleFavorite}
                    style={styles.favoriteButton}
                />
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        elevation: 2,
        marginVertical: 8,
        marginHorizontal: 12,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 12,
        marginRight: 12,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontWeight: '600',
        marginBottom: 2,
    },
    subtitle: {
        color: '#6b6b6b',
        marginBottom: 4,
    },
    price: {
        fontWeight: '600',
        color: '#000',
    },
    favoriteButton: {
        backgroundColor: '#f0ecff',
        borderRadius: 20,
    },
});

export default SuggestedCard;
