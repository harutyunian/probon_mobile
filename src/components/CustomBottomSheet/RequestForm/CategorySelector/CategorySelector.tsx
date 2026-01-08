import { View, StyleSheet, TouchableOpacity, TextInput as RNTextInput } from 'react-native';
import { Button, Text, List, Divider, useTheme } from 'react-native-paper';
import CustomIcon from "../../../Icon/Icon";
import { FlashList } from '@shopify/flash-list';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { closeBottomSheet } from '../../../../store/bottomSheetSlice/bottomSheetSlice';
import { setCreateRequestFormField, setCreateRequestForm } from '../../../../store/createRequestFormSlice/createRequestFormSlice';
import { IRequestFormCategory } from '../../../../types/requestFormSlice';

const CATEGORIES: Array<IRequestFormCategory> = [
    { label: "Entertainment", value: "entertainment" },
    { label: "Travel", value: "travel" },
    { label: "Food & Dining", value: "food" },
    { label: "Shopping", value: "shopping" },
    { label: "Health & Wellness", value: "health" },
    { label: "Education", value: "education" },
    { label: "Technology", value: "technology" },
    { label: "Sports", value: "sports" },
];

const SUBCATEGORIES: Record<string, Array<IRequestFormCategory>> = {
    entertainment: [
        { label: "Movies", value: "movies" },
        { label: "Music", value: "music" },
        { label: "Sports", value: "sports" },
        { label: "Events", value: "events" },
        { label: "Concerts", value: "concerts" },
        { label: "Theater", value: "theater" },
    ],
    travel: [
        { label: "Hotels", value: "hotels" },
        { label: "Flights", value: "flights" },
        { label: "Tours", value: "tours" },
        { label: "Activities", value: "activities" },
        { label: "Car Rentals", value: "car_rentals" },
        { label: "Cruises", value: "cruises" },
    ],
    food: [
        { label: "Restaurants", value: "restaurants" },
        { label: "Cafes", value: "cafes" },
        { label: "Fast Food", value: "fast_food" },
        { label: "Delivery", value: "delivery" },
    ],
    shopping: [
        { label: "Clothing", value: "clothing" },
        { label: "Electronics", value: "electronics" },
        { label: "Home & Garden", value: "home_garden" },
        { label: "Books", value: "books" },
    ],
    health: [
        { label: "Fitness", value: "fitness" },
        { label: "Spa", value: "spa" },
        { label: "Medical", value: "medical" },
        { label: "Nutrition", value: "nutrition" },
    ],
    education: [
        { label: "Online Courses", value: "online_courses" },
        { label: "Tutoring", value: "tutoring" },
        { label: "Workshops", value: "workshops" },
        { label: "Certifications", value: "certifications" },
    ],
    technology: [
        { label: "Software", value: "software" },
        { label: "Hardware", value: "hardware" },
        { label: "Apps", value: "apps" },
        { label: "Services", value: "services" },
    ],
    sports: [
        { label: "Gym", value: "gym" },
        { label: "Team Sports", value: "team_sports" },
        { label: "Individual Sports", value: "individual_sports" },
        { label: "Equipment", value: "equipment" },
    ],
};

interface CategorySelectorProps {
    isSubcategory?: boolean;
}

export default function CategorySelector({ isSubcategory = false }: CategorySelectorProps) {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const searchInputRef = useRef<RNTextInput>(null);
    
    const savedCategory = useAppSelector(state => state.createRequestForm.form.category);
    const savedSubCategory = useAppSelector(state => state.createRequestForm.form.subCategory);

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedValue, setSelectedValue] = useState<string | null>(
        isSubcategory ? (savedSubCategory?.value || null) : (savedCategory?.value || null)
    );

    // Get available options based on whether this is category or subcategory
    const availableOptions = useMemo(() => {
        if (isSubcategory && savedCategory?.value) {
            return SUBCATEGORIES[savedCategory.value] || [];
        }
        return CATEGORIES;
    }, [isSubcategory, savedCategory?.value]);

    // Filter options based on search query
    const filteredOptions = useMemo(() => {
        if (!searchQuery.trim()) {
            return availableOptions;
        }
        return availableOptions.filter(option =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [availableOptions, searchQuery]);

    // Focus search input when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            searchInputRef.current?.focus();
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = useCallback(() => {
        dispatch(closeBottomSheet());
    }, [dispatch]);

    const handleSave = useCallback(() => {
        if (selectedValue) {
            const selectedOption = availableOptions.find(opt => opt.value === selectedValue);
            if (selectedOption) {
                if (isSubcategory) {
                    dispatch(setCreateRequestFormField({
                        subCategory: { label: selectedOption.label, value: selectedOption.value }
                    }));
                    dispatch(setCreateRequestForm({ 
                        nextButtonDisabled: false, 
                        disableRequest: false 
                    }));
                } else {
                    dispatch(setCreateRequestFormField({
                        category: { label: selectedOption.label, value: selectedOption.value }
                    }));
                    // Reset subcategory when category changes
                    dispatch(setCreateRequestFormField({
                        subCategory: { label: "", value: "" }
                    }));
                    dispatch(setCreateRequestForm({ nextButtonDisabled: true }));
                }
            }
        }
        dispatch(closeBottomSheet());
    }, [dispatch, selectedValue, availableOptions, isSubcategory]);

    const handleSelect = useCallback((value: string) => {
        setSelectedValue(value);
    }, []);

    const renderListItem = useCallback(({ item }: { item: IRequestFormCategory }) => {
        const isSelected = selectedValue === item.value;

        return (
            <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleSelect(item.value)}
                activeOpacity={0.7}
            >
                <View style={styles.listItemContent}>
                    <Text style={[
                        styles.listItemText,
                        isSelected && styles.selectedText
                    ]}>
                        {item.label}
                    </Text>
                    {isSelected && (
                        <CustomIcon 
                            name="check" 
                            size={20} 
                            color={theme.colors.primary} 
                        />
                    )}
                </View>
            </TouchableOpacity>
        );
    }, [selectedValue, theme.colors.primary, handleSelect]);

    const renderItemSeparator = useCallback(() => (
        <Divider />
    ), []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.heading}>
                <TouchableOpacity onPress={handleClose}>
                    <CustomIcon name="close" size={20} color="#666" />
                </TouchableOpacity>
                <Text style={styles.title}>
                    {isSubcategory ? 'Select Subcategory' : 'Select Category'}
                </Text>
                <Button 
                    mode="text" 
                    onPress={handleSave} 
                    textColor={theme.colors.primary}
                    disabled={!selectedValue}
                >
                    Save
                </Button>
            </View>

            {/* Search Input */}
            <View style={styles.searchContainer}>
                <View style={styles.searchInputWrapper}>
                    <CustomIcon 
                        name="search" 
                        size={20} 
                        color="#999" 
                        style={styles.searchIcon} 
                    />
                    <RNTextInput
                        ref={searchInputRef}
                        style={styles.searchInput}
                        placeholder={`Search ${isSubcategory ? 'subcategories' : 'categories'}...`}
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity 
                            onPress={() => setSearchQuery('')}
                            style={styles.clearButton}
                        >
                            <CustomIcon name="close" size={18} color="#999" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Options List */}
            <View style={styles.listWrapper}>
                {filteredOptions.length > 0 ? (
                    <FlashList
                        data={filteredOptions}
                        keyExtractor={(item) => item.value}
                        renderItem={renderListItem}
                        ItemSeparatorComponent={renderItemSeparator}
                        estimatedItemSize={56}
                        contentContainerStyle={styles.listContent}
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <CustomIcon name="search" size={48} color="#ccc" />
                        <Text style={styles.emptyText}>No results found</Text>
                        <Text style={styles.emptySubtext}>
                            Try searching with different keywords
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 16,
    },
    heading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 4,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
    },
    searchContainer: {
        paddingHorizontal: 4,
        marginBottom: 16,
    },
    searchInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        paddingVertical: 0,
    },
    clearButton: {
        padding: 4,
        marginLeft: 4,
    },
    listWrapper: {
        flex: 1,
        marginBottom: 16,
    },
    listContent: {
        paddingBottom: 40,
    },
    listItem: {
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
    listItemContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    listItemText: {
        fontSize: 16,
        color: "#000",
        fontWeight: '400',
    },
    selectedText: {
        color: "#6200ee",
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 48,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        marginTop: 8,
        textAlign: 'center',
    },
});