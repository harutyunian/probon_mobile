// src/pages/Home/Home.tsx
import {
    StyleSheet,
    View,
    Platform,
    useWindowDimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import React, {useRef, useContext, useMemo, useCallback} from 'react';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import MainCard from '../../components/MainCard/MainCard';
import ListHeader from './ListHeader/ListHeader';
import {useScrollToTop} from '@react-navigation/native';
import {ScrollContext} from "../../navigation/Screens/HomeScreen/ScrollContext";
import {useAppSelector} from "../../hooks/redux";

// --- MOCK DATA --- replace with paginated data in production
const fillPkg = Array.from({length: 20}, (_, index) => index);
const HEADER_HEIGHT = 60;

// --- MEMOIZED COMPONENTS ---
const MemoizedMainCard = React.memo(MainCard);
const MemoizedListHeader = React.memo(ListHeader);

export function Home(): React.JSX.Element {
    const {width} = useWindowDimensions(); // ✅ dynamic columns on rotation
    const ref = useRef<FlashList<number>>(null);
    useScrollToTop(ref);

    const {scrollY} = useContext(ScrollContext);
    if (!scrollY) throw new Error('Home component must be inside ScrollContext.Provider');

    // --- SCROLL HANDLER ---
    // Use plain function to avoid any Animated.event interop quirks within FlashList
    const handleOnScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollY.setValue(event.nativeEvent.contentOffset.y);
    }, [scrollY]);

    // --- NUMBER OF COLUMNS ---
    const numOfPkgColumns = useMemo(() => Math.floor(width / 180), [width]);

    // --- RENDER ITEM ---
    const renderItem = ({item}: ListRenderItemInfo<number>) => <MemoizedMainCard/>;

    const aper = useAppSelector((state) => state.bottomSheet);

    return (
        <View style={styles.container}>
            {/* HEADER PLACEHOLDER */}
            <View style={{height: HEADER_HEIGHT}}/>

            <FlashList
                ref={ref}
                data={fillPkg}
                drawDistance={50}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={numOfPkgColumns}
                ListHeaderComponent={MemoizedListHeader}
                estimatedItemSize={260}
                removeClippedSubviews={true}
                onScroll={handleOnScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 65}}
                // ✅ OPTIMIZATION #14: FlashList specific optimizations
                initialNumToRender={8}
                // ✅ OPTIMIZATION #14: Scroll performance
                scrollIndicatorInsets={{right: 1}}
                showsVerticalScrollIndicator={false}
                // ✅ OPTIMIZATION #14: iOS specific optimizations
                bounces={false}
                decelerationRate="fast"
                // ✅ OPTIMIZATION #14: Performance monitoring
                onScrollBeginDrag={() => console.log('Scroll started')}
                onScrollEndDrag={() => console.log('Scroll ended')}
                onMomentumScrollBegin={() => console.log('Momentum scroll started')}
                onMomentumScrollEnd={() => console.log('Momentum scroll ended')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Platform.OS === 'ios' ? '#f0f0f0' : '#FFFFFF',
    },
});
