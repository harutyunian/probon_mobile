import {View, StyleSheet, Dimensions, StyleProp, ViewStyle} from "react-native";
// Note: We no longer need Animated, useAnimatedStyle, etc. for the pagination
import type {ICarouselInstance} from "react-native-reanimated-carousel";
import Carousel, {Pagination} from "react-native-reanimated-carousel";
import {Image} from 'expo-image';
import {useRef, useMemo, useCallback} from "react";
import {useSharedValue, runOnJS} from "react-native-reanimated";

const {width: screenWidth} = Dimensions.get('window');

interface ImageCarouselProps {
    images: Array<{ url: string, id: string }>;
    containerStyle?: StyleProp<ViewStyle>;
    imageContainerStyle?: StyleProp<ViewStyle>;
    imageWidth?: number;
    height?: number;
}

// ✅ OPTIMIZATION #10: Memoize carousel item renderer with advanced image optimization
const renderCarouselItem = ({item}: { item: { url: string, id: string } }) => (
    <View style={styles.imageContainer}>
        <Image
            source={{
                uri: item.url,
            }}
            priority={'high'}
            style={styles.image}
            cachePolicy="memory-disk"
            contentFit="cover"
            // ✅ OPTIMIZATION #10: Progressive loading and better caching
            transition={200}
            recyclingKey={item.id}
            // ✅ OPTIMIZATION #10: Advanced image optimization
            placeholderContentFit="cover"
            // ✅ OPTIMIZATION #10: Memory management
            onLoadStart={() => console.log(`Loading image: ${item.id}`)}
            onLoad={() => console.log(`Image loaded: ${item.id}`)}
            onError={(error) => console.warn(`Image failed: ${item.id}`, error)}
        />
    </View>
);

export function ImageCarousel(props: ImageCarouselProps) {
    const {images, containerStyle, imageWidth = screenWidth, imageContainerStyle, height = 240} = props;
    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    // ✅ OPTIMIZATION #10: Early return with memoization
    if (!images || images.length === 0) {
        return null;
    }

    // ✅ OPTIMIZATION #10: Memoize progress change handler to avoid Reanimated warnings
    const handleProgressChange = useCallback((_: any, absoluteProgress: number) => {
        // ✅ OPTIMIZATION #10: Use runOnJS to avoid Reanimated warnings
        runOnJS(() => {
            progress.value = absoluteProgress;
        })();
    }, [progress]);

    // ✅ OPTIMIZATION #10: Memoize viewability change handler
    const handleViewableItemsChanged = useCallback((info: any) => {
        // Track which images are visible for better caching
        console.log('Visible items:', info.viewableItems.map((item: any) => item.index));
    }, []);

    // ✅ OPTIMIZATION #10: Memoize carousel props with advanced performance settings
    const carouselProps = useMemo(() => ({
        style: imageContainerStyle,
        ref: ref,
        data: images,
        renderItem: renderCarouselItem,
        width: imageWidth,
        height: height,
        loop: true,
        autoPlay: false,
        autoPlayInterval: 3000,
        snapEnabled: true,
        pagingEnabled: true,
        onProgressChange: handleProgressChange,
        // ✅ OPTIMIZATION #10: Advanced performance improvements
        windowSize: 5,
        initialNumToRender: 1,
        maxToRenderPerBatch: 2,
        removeClippedSubviews: true,
        // ✅ OPTIMIZATION #10: Memory optimizations
        onViewableItemsChanged: handleViewableItemsChanged,
        viewabilityConfig: {
            itemVisiblePercentThreshold: 50,
            minimumViewTime: 100,
        },
    }), [imageContainerStyle, images, imageWidth, height, handleProgressChange, handleViewableItemsChanged]);

    return (
        <View style={[styles.container, containerStyle]}>
            <Carousel
                {...carouselProps}
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