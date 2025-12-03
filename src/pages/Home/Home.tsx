// src/pages/Home/Home.tsx
import {memo} from "react";
import {
    StyleSheet,
    View,
    Platform,
    useWindowDimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import React, {useRef, useContext, useMemo, useCallback} from 'react';
import {FlashList, ListRenderItemInfo, FlashListRef} from '@shopify/flash-list';
import MainCard from '../../components/MainCard/MainCard';
import ListHeader from './ListHeader/ListHeader';
import {useScrollToTop} from '@react-navigation/native';
import {ScrollContext} from "../../navigation/Screens/HomeScreen/ScrollContext";

// --- MOCK DATA --- replace with paginated data in production
const fillPkg = Array.from({length: 20}, (_, index) => index);
const HEADER_HEIGHT = 60;

// --- MEMOIZED COMPONENTS ---
const MemoizedMainCard = memo(MainCard);
const MemoizedListHeader = ListHeader

export function Home(): React.JSX.Element {
    const {width} = useWindowDimensions(); // ✅ dynamic columns on rotation
    const ref = useRef<FlashListRef<number>>(null);
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

    return (
        <View style={styles.container}>
            <View style={{height: HEADER_HEIGHT}}/>
            <FlashList
                ref={ref}
                data={fillPkg}
                drawDistance={50}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={numOfPkgColumns}
                ListHeaderComponent={MemoizedListHeader}
                removeClippedSubviews={true}
                onScroll={handleOnScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 65}}
                scrollIndicatorInsets={{right: 1}}
                showsVerticalScrollIndicator={false}
                bounces={false}
                decelerationRate="fast"
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
