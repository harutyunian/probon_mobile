import React, {useCallback, useEffect, useRef, memo, useMemo} from 'react';
import {
    StyleSheet,
    Keyboard,
    useWindowDimensions,
    Platform,
} from 'react-native';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
} from '@gorhom/bottom-sheet';

import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import BottomSheetContent from "./BottomSheetContent";
import {closeBottomSheet} from "../../store/bottomSheetSlice/bottomSheetSlice";

function CustomBottomSheetInner() {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    
    // Use separate selectors for better performance
    const type = useAppSelector((state) => state.bottomSheet.type);
    const isOpen = useAppSelector((state) => state.bottomSheet.isOpen);
    const bottomSheetHeightParam = useAppSelector((state) => state.bottomSheet.height);
    
    const dispatch = useAppDispatch();
    const {height: screenHeight} = useWindowDimensions();

    const snapPoints = useMemo(() => {
        const minHeight = screenHeight * 0.30;
        
        if (!bottomSheetHeightParam) {
            return [minHeight, screenHeight * 0.5];
        }

        const heightPercent = typeof bottomSheetHeightParam === 'string'
            ? parseFloat(bottomSheetHeightParam.replace('%', ''))
            : bottomSheetHeightParam;
        const heightValue = (heightPercent / 100) * screenHeight;
        
        return [minHeight, heightValue];
    }, [bottomSheetHeightParam, screenHeight]);

    // Control open/close based on Redux state
    useEffect(() => {
        if (isOpen) {
            Keyboard.dismiss();
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.dismiss();
        }
    }, [isOpen]);

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.5}
                pressBehavior="close"
            />
        ),
        []
    );

    const handleDismiss = useCallback(() => {
        dispatch(closeBottomSheet());
        Keyboard.dismiss();
    }, [dispatch]);

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            enableDynamicSizing={false}
            backdropComponent={renderBackdrop}
            onDismiss={handleDismiss}
            handleIndicatorStyle={styles.handleIndicator}
            backgroundStyle={styles.background}
            keyboardBehavior={Platform.OS === 'ios' ? 'interactive' : 'fillParent'}
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjustResize"
        >
            <BottomSheetView style={styles.bottomSheetContainer}>
                <BottomSheetContent type={type} />
            </BottomSheetView>
        </BottomSheetModal>
    );
}

function CustomBottomSheet() {
    return (
        <BottomSheetModalProvider>
            <CustomBottomSheetInner />
        </BottomSheetModalProvider>
    );
}

const styles = StyleSheet.create({
    bottomSheetContainer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
        paddingBottom: 120
    },
    handleIndicator: {
        backgroundColor: '#DDDDDD',
        width: 40,
    },
    background: {
        backgroundColor: 'white',
    }
});

export default memo(CustomBottomSheet);
