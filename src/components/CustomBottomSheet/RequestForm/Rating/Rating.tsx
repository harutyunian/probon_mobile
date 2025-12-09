import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "../../../Icon/Icon";
import {Button, useTheme} from "react-native-paper";
import {useState, useEffect, useCallback} from "react";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {closeBottomSheet} from "../../../../store/bottomSheetSlice/bottomSheetSlice";
import {setCreateRequestFormField} from "../../../../store/createRequestFormSlice/createRequestFormSlice";
import {IRating} from "../../../../types/requestFormSlice";

const ratingOptions = [5, 4, 3, 2, 1];

export default function Rating() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const savedRating = useAppSelector(state => state.createRequestForm.form.rating);
    
    const [selectedRatings, setSelectedRatings] = useState<number[]>(
        savedRating?.ratings ?? []
    );

    // Update local state when saved rating changes
    useEffect(() => {
        if (savedRating?.ratings) {
            setSelectedRatings(savedRating.ratings);
        }
    }, [savedRating]);

    const handleClose = useCallback(() => {
        dispatch(closeBottomSheet());
    }, [dispatch]);

    const handleSave = useCallback(() => {
        const rating: IRating = {
            ratings: selectedRatings,
        };
        dispatch(setCreateRequestFormField({rating}));
        dispatch(closeBottomSheet());
    }, [dispatch, selectedRatings]);

    const toggleRating = useCallback((ratingValue: number) => {
        setSelectedRatings((prev) => {
            if (prev.includes(ratingValue)) {
                return prev.filter((r) => r !== ratingValue);
            } else {
                return [...prev, ratingValue].sort((a, b) => b - a);
            }
        });
    }, []);

    const isRatingSelected = (ratingValue: number) => {
        return selectedRatings.includes(ratingValue);
    };

    // Checkmark icon component
    const CheckmarkIcon = () => (
        <Text style={[styles.checkmark, {color: theme.colors.primary}]}>✓</Text>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.heading}>
                <TouchableOpacity onPress={handleClose}>
                    <Icon name="close" size={14} color="grey"/>
                </TouchableOpacity>
                <Text style={styles.title}>Rating</Text>
                <Button 
                    mode="text" 
                    onPress={handleSave} 
                    textColor={theme.colors.primary}
                    style={styles.saveButton}
                >
                    Save
                </Button>
            </View>

            {/* Rating Rows */}
            <View style={styles.body}>
                {ratingOptions.map((ratingValue) => {
                    const starCount = Array(ratingValue).fill(1);
                    const isSelected = isRatingSelected(ratingValue);
                    
                    return (
                        <TouchableOpacity
                            key={`rating_${ratingValue}`}
                            style={[
                                styles.ratingRow,
                                isSelected && styles.ratingRowSelected
                            ]}
                            onPress={() => toggleRating(ratingValue)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.starsContainer}>
                                {starCount.map((_, starIndex) => (
                                    <Icon
                                        key={`star_${ratingValue}_${starIndex}`}
                                        color="#FFCC00"
                                        name="starFilled"
                                        size={20}
                                    />
                                ))}
                            </View>
                            {isSelected && (
                                <View style={styles.rowCheckmark}>
                                    <CheckmarkIcon />
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: "#E0E0E0",
        borderRadius: 2,
        alignSelf: "center",
        marginBottom: 12,
    },
    heading: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        paddingVertical: 14,
        paddingHorizontal: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
    },
    saveButton: {
        margin: 0,
        padding: 0,
    },
    checkmark: {
        fontSize: 18,
        fontWeight: "bold",
    },
    ratingRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 4,
        paddingHorizontal: 4,
        borderRadius: 8,
    },
    starsContainer: {
        display: "flex",
        flexDirection: "row",
        columnGap: 8,
    },
    rowCheckmark: {
        marginLeft: 8,
    },
    ratingRowSelected: {
        backgroundColor: "rgba(94, 77, 237, 0.1)", // Light purple background when selected
    },
    body: {
        paddingHorizontal: 12,
        rowGap: 17,
        paddingTop: 8,
    },
});