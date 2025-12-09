import {View, Text, StyleSheet, TouchableOpacity, TextInput as RNTextInput} from "react-native";
import {Button, useTheme} from 'react-native-paper';
import RangeSlider from 'react-native-sticky-range-slider';
import {useState, useEffect, useCallback, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {closeBottomSheet} from '../../../../store/bottomSheetSlice/bottomSheetSlice';
import {setCreateRequestFormField} from '../../../../store/createRequestFormSlice/createRequestFormSlice';
import {IPriceRange} from '../../../../types/requestFormSlice';
import Icon from '../../../Icon/Icon';

const MIN_PRICE = 0;
const MAX_PRICE = 5000;

export function PricerRange() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const savedPriceRange = useAppSelector(state => state.createRequestForm.form.priceRange);

    const [minPrice, setMinPrice] = useState<number>(savedPriceRange?.min ?? 40);
    const [maxPrice, setMaxPrice] = useState<number>(savedPriceRange?.max ?? 500);
    const isDraggingRef = useRef(false);
    const primaryColorRef = useRef(theme.colors.primary);
    
    // Update color ref when theme changes
    useEffect(() => {
        primaryColorRef.current = theme.colors.primary;
    }, [theme.colors.primary]);

    // Update local state when saved price range changes (only when not dragging)
    useEffect(() => {
        if (savedPriceRange && !isDraggingRef.current) {
            setMinPrice(savedPriceRange.min);
            setMaxPrice(savedPriceRange.max);
        }
    }, [savedPriceRange]);

    const handleClose = useCallback(() => {
        dispatch(closeBottomSheet());
    }, [dispatch]);

    const handleSave = useCallback(() => {
        const priceRange: IPriceRange = {
            min: minPrice,
            max: maxPrice,
        };
        dispatch(setCreateRequestFormField({priceRange}));
        dispatch(closeBottomSheet());
    }, [dispatch, minPrice, maxPrice]);

    const handleValueChanged = useCallback((low: number, high: number) => {
        setMinPrice(low);
        setMaxPrice(high);
        isDraggingRef.current = false;
    }, []);

    const handleSlidingStart = useCallback(() => {
        isDraggingRef.current = true;
    }, []);

    const handleMinTextChange = useCallback((text: string) => {
        const numericValue = parseInt(text.replace(/\D/g, ''), 10);
        if (!isNaN(numericValue)) {
            const newMin = Math.max(MIN_PRICE, Math.min(numericValue, maxPrice - 1));
            setMinPrice(newMin);
        } else if (text === '') {
            setMinPrice(MIN_PRICE);
        }
    }, [maxPrice]);

    const handleMaxTextChange = useCallback((text: string) => {
        const numericValue = parseInt(text.replace(/\D/g, ''), 10);
        if (!isNaN(numericValue)) {
            const newMax = Math.min(MAX_PRICE, Math.max(numericValue, minPrice + 1));
            setMaxPrice(newMax);
        } else if (text === '') {
            setMaxPrice(MAX_PRICE);
        }
    }, [minPrice]);

    // Custom render functions for the slider - stable functions that don't recreate
    const renderThumb = useCallback((type: 'low' | 'high') => (
        <View
            style={[
                styles.thumb,
                { backgroundColor: primaryColorRef.current }
            ]}
        />
    ), []);

    const renderRail = useCallback(() => (
        <View style={styles.rail} />
    ), []);

    const renderRailSelected = useCallback(() => (
        <View style={[styles.railSelected, { backgroundColor: primaryColorRef.current }]} />
    ), []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleClose}>
                    <Icon name="close" size={14} color="grey"/>
                </TouchableOpacity>
                <Text style={styles.title}>Price range</Text>
                <Button mode="text" onPress={handleSave} textColor={theme.colors.primary}>
                    Save
                </Button>
            </View>

            {/* Range Slider */}
            <View style={styles.sliderContainer}>
                <RangeSlider
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    low={minPrice}
                    high={maxPrice}
                    step={1}
                    renderThumb={renderThumb}
                    renderRail={renderRail}
                    renderRailSelected={renderRailSelected}
                    onValueChanged={handleValueChanged}
                    onSlidingStart={handleSlidingStart}
                />
            </View>

            {/* Price Input Fields */}
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Min price</Text>
                    <View style={styles.inputBox}>
                        <RNTextInput
                            style={styles.inputText}
                            value={minPrice.toString()}
                            onChangeText={handleMinTextChange}
                            keyboardType="numeric"
                        />
                        <Text style={styles.currencySymbol}>$</Text>
                    </View>
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Max price</Text>
                    <View style={styles.inputBox}>
                        <RNTextInput
                            style={styles.inputText}
                            value={maxPrice === MAX_PRICE ? `${maxPrice} +` : maxPrice.toString()}
                            onChangeText={handleMaxTextChange}
                            keyboardType="numeric"
                        />
                        <Text style={styles.currencySymbol}>$</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 8,
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    sliderContainer: {
        marginVertical: 24,
        height: 40,
        justifyContent: 'center',
    },
    thumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    rail: {
        flex: 1,
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
    },
    railSelected: {
        height: 4,
        borderRadius: 2,
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    inputWrapper: {
        flex: 1,
    },
    inputLabel: {
        fontSize: 14,
        color: '#74717A',
        marginBottom: 8,
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#FFF',
    },
    inputText: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        padding: 0,
        margin: 0,
    },
    currencySymbol: {
        fontSize: 16,
        color: '#74717A',
        marginLeft: 4,
    },
});
