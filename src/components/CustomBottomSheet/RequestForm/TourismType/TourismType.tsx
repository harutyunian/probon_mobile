import {View, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {Button, Text, Checkbox, useTheme, Icon, Tooltip} from 'react-native-paper';
import CustomIcon from "../../../Icon/Icon";
import {FlashList} from '@shopify/flash-list';
import {useState, useEffect, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {closeBottomSheet} from '../../../../store/bottomSheetSlice/bottomSheetSlice';
import {setCreateRequestFormField} from '../../../../store/createRequestFormSlice/createRequestFormSlice';
import {ITourismType} from '../../../../types/requestFormSlice';

const tourismTypes = [
    {type: "Cultural travel", value: "cultural", hasInfo: true, infoText: "Experiencing local traditions, arts, history, and heritage."},
    {type: "Leisure travel", value: "leisure", hasInfo: false},
    {type: "Business travel", value: "business", hasInfo: false},
    {type: "Adventure travel", value: "adventure", hasInfo: false},
    {type: "Ecotourism", value: "ecotourism", hasInfo: false},
    {type: "Leisure travel2", value: "leisasdure", hasInfo: false},
    {type: "Business trave3", value: "busasdsainess", hasInfo: false},
    {type: "Adventure travel4", value: "advasdaenture", hasInfo: false},
    {type: "Ecotou55rism", value: "ecotoasdasurism", hasInfo: false},
];

export default function TourismType() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const savedTourismType = useAppSelector(state => state.createRequestForm.form.tourismType);
    const savedIsGroupTour = useAppSelector(state => state.createRequestForm.form.isGroupTour);

    const [selectedType, setSelectedType] = useState<string | null>(
        savedTourismType?.value || null
    );
    const [isGroupTour, setIsGroupTour] = useState<boolean>(savedIsGroupTour || false);
    const [iconPressed, setIconPressed] = useState<string | null>(null);

    // Update local state when saved values change
    useEffect(() => {
        if (savedTourismType) {
            setSelectedType(savedTourismType.value);
        }
        if (savedIsGroupTour !== undefined) {
            setIsGroupTour(savedIsGroupTour);
        }
    }, [savedTourismType, savedIsGroupTour]);

    const handleClose = useCallback(() => {
        dispatch(closeBottomSheet());
    }, [dispatch]);

    const handleSave = useCallback(() => {
        if (selectedType) {
            const selectedTourismType = tourismTypes.find(t => t.value === selectedType);
            if (selectedTourismType) {
                const tourismTypeData: ITourismType = {
                    type: selectedTourismType.type,
                    value: selectedTourismType.value,
                };
                dispatch(setCreateRequestFormField({
                    tourismType: tourismTypeData,
                    isGroupTour: isGroupTour,
                }));
            }
        }
        dispatch(closeBottomSheet());
    }, [dispatch, selectedType, isGroupTour]);

    const handleTypeSelect = useCallback((value: string) => {
        // If selecting business travel while group tour is checked, don't allow it
        if (value === 'business' && isGroupTour) {
            return; // Don't allow selection
        }
        setSelectedType(value);
    }, [isGroupTour]);

    const handleGroupTourToggle = useCallback(() => {
        const newValue = !isGroupTour;
        setIsGroupTour(newValue);
        // If enabling group tour and business travel is selected, deselect it
        if (newValue && selectedType === 'business') {
            setSelectedType(null);
        }
    }, [isGroupTour, selectedType]);

    const renderListItem = useCallback(({item}: {item: typeof tourismTypes[0]}) => {
        const isSelected = selectedType === item.value;
        const showError = item.value === 'business' && isSelected && isGroupTour;
        const isIconPressed = iconPressed === item.value;

        const handleListItemPress = () => {
            // Don't select if icon was just pressed
            if (!isIconPressed) {
                handleTypeSelect(item.value);
            }
        };

        const handleIconPress = () => {
            setIconPressed(item.value);
            // Reset after tooltip interaction
            setTimeout(() => {
                setIconPressed(null);
            }, 300);
        };

        return (
            <View>
                <TouchableOpacity
                    style={style.listItem}
                    onPress={handleListItemPress}
                    disabled={item.value === 'business' && isGroupTour && !isSelected}
                >
                    <View style={style.listItemContent}>
                        <View style={style.listItemLeft}>
                            {isSelected && !showError && (
                                <Icon source="check" size={20} color={theme.colors.primary} />
                            )}
                            <Text style={[
                                style.listItemText,
                                item.value === 'business' && isGroupTour && !isSelected && style.disabledText
                            ]}>
                                {item.type}
                            </Text>
                            {item.hasInfo && (
                                <Pressable onPress={handleIconPress}>
                                    <Tooltip title={item.infoText || "Information"}>
                                        <View style={style.infoIconWrapper}>
                                            <CustomIcon
                                                name="alertCircleOutline"
                                                size={14}
                                                color="grey"
                                                style={style.infoIcon}
                                            />
                                        </View>
                                    </Tooltip>
                                </Pressable>
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
                {showError && (
                    <Text style={style.errorText}>
                        Group tour is not available for business travel
                    </Text>
                )}
            </View>
        );
    }, [selectedType, isGroupTour, theme.colors.primary, handleTypeSelect, iconPressed]);

    return (
        <View style={style.container}>
            {/* Header */}
            <View style={style.heading}>
                <TouchableOpacity onPress={handleClose}>
                    <CustomIcon name="close" size={14} color="grey"/>
                </TouchableOpacity>
                <Text style={style.title}>Tourism type</Text>
                <Button mode="text" onPress={handleSave} textColor={theme.colors.primary}>
                    Save
                </Button>
            </View>

            {/* Group Tour Checkbox */}
            <View style={style.checkboxContainer}>
                <Checkbox.Android
                    status={isGroupTour ? "checked" : "unchecked"}
                    onPress={handleGroupTourToggle}
                />
                <Text style={style.checkboxLabel}>I want a group tour</Text>
            </View>

            {/* Tourism Types List */}
            <FlashList
                data={tourismTypes}
                keyExtractor={(item) => item.value}
                renderItem={renderListItem}
                contentContainerStyle={style.listContainer}
                // estimatedItemSize={56}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        width: '100%',
        // todo: poxel arxitekturan vor 100% lini 100%
        height: '180%',
        // flex: 1,
    },
    heading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
        paddingHorizontal: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        paddingVertical: 8,
    },
    checkboxLabel: {
        fontSize: 16,
        marginLeft: 8,
        color: "#000",
    },
    listContainer: {
        paddingBottom: 40,
        height: "150%"
    },
    listItem: {
        paddingVertical: 12,
        paddingHorizontal: 4,
    },
    listItemContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    listItemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    checkIcon: {
        marginRight: 8,
    },
    infoIconWrapper: {
        marginLeft: 8,
        padding: 4,
    },
    infoIcon: {
        // Icon styles
    },
    listItemText: {
        fontSize: 16,
        color: "#000",
    },
    disabledText: {
        color: "#999",
    },
    errorText: {
        fontSize: 14,
        color: "#FF0000",
        marginTop: 4,
        marginLeft: 22,
    },
});
