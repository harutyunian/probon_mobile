import { View, StyleSheet, Dimensions } from "react-native";
// Note: We no longer need Animated, useAnimatedStyle, etc. for the pagination
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { Image } from 'expo-image';
import { useRef } from "react";
import { useSharedValue } from "react-native-reanimated";

// Get the full width of the device's screen
const { width: screenWidth } = Dimensions.get('window');

interface ImageCarouselProps {
    images: Array<{ url: string, id: string }>;
}

const renderCarouselItem = ({ item }: { item: { url: string, id: string } }) => (
    <View style={styles.imageContainer}>
        <Image source={{ uri: item.url }} style={styles.image} contentFit="cover" />
    </View>
);

export function ImageCarousel(props: ImageCarouselProps) {
    const { images } = props;
    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Carousel
                ref={ref}
                data={images}
                renderItem={renderCarouselItem}
                width={screenWidth}
                height={240}
                loop={true}
                autoPlay={true}
                autoPlayInterval={3000}
                snapEnabled={true}
                pagingEnabled={true}
                onProgressChange={(_, absoluteProgress) =>
                    (progress.value = absoluteProgress)
                }
            />
            {images.length > 1 && (
                <Pagination.Basic
                    progress={progress}
                    data={images}
                    dotStyle={styles.dot}
                    containerStyle={styles.paginationContainer}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    imageContainer: {
        width: screenWidth,
        height: '100%',
    },
    image: {
        flex: 1,
    },
    paginationContainer: {
        // This style is now passed to the Pagination.Basic component
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 10,
    },
    // A basic style for the dots. Pagination.Basic will animate them
    // (e.g., by changing scale or opacity) to show the active state.
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // A semi-transparent black
    },
});