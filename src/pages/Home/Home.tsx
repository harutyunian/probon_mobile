// src/pages/Home/Home.tsx

import {
    Dimensions,
    StyleSheet,
    View,
    Animated,
    Platform,
    // --- TYPE ADDED ---
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import MainCard from '../../components/MainCard/MainCard';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import ListHeader from './ListHeader/ListHeader';
import React, {useMemo, useRef, useContext} from 'react';
import {useScrollToTop} from '@react-navigation/native';
import {ScrollContext} from "../../navigation/Screens/HomeScreen/ScrollContext";

const fillPkg = Array.from({length: 1000}, (_, index) => index);
const HEADER_HEIGHT = 60;

export function Home(): React.JSX.Element {
    const ref = useRef<FlashList<number>>(null);
    useScrollToTop(ref);

    const {scrollY} = useContext(ScrollContext);

    if (!scrollY) {
        throw new Error('Home component must be rendered within a ScrollContext.Provider');
    }

    // --- MODIFIED: Switched from Animated.event to a manual handler ---
    // This function will be called on every scroll event.
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        // We manually set the value of our Animated.Value.
        // This runs on the JS thread.
        scrollY.setValue(event.nativeEvent.contentOffset.y);
    };

    const numOfPkgColumns = useMemo(() => {
        const width = Dimensions.get('window').width;
        return Math.floor(width / 180);
    }, []);

    const renderItem = ({item}: ListRenderItemInfo<number>): React.JSX.Element => (
        <MainCard/>
    );

    return (
        <View style={styles.container}>
            <View style={{height: HEADER_HEIGHT}}/>
            <FlashList
                ref={ref}
                numColumns={numOfPkgColumns}
                ListHeaderComponent={ListHeader}
                data={fillPkg}
                estimatedItemSize={250}
                renderItem={renderItem}

                // Use the new manual handler function
                onScroll={handleScroll}
                // This is still important to control the event frequency
                scrollEventThrottle={16}
                contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 65}}
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