import {StyleSheet, View, TouchableOpacity} from "react-native";
import {Text, TextInput} from "react-native-paper";
import Icon from "../../../../components/Icon/Icon";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {useCallback, useMemo} from "react";
import {openBottomSheet} from "../../../../store/bottomSheetSlice/bottomSheetSlice";
import {BOTTOM_SHEET} from "../../../../store/bottomSheetSlice/types";

export default function SelectCategory() {
    const dispatch = useAppDispatch();
    
    const category = useAppSelector(state => state.createRequestForm.form.category);
    const subCategory = useAppSelector(state => state.createRequestForm.form.subCategory);

    const showSubCategory = useMemo(
        () => category?.value !== null && category?.value !== "",
        [category?.value]
    );

    const handleOpenCategorySheet = useCallback(() => {
        dispatch(openBottomSheet({
            type: BOTTOM_SHEET.CATEGORY_SELECT,
            height: "75%"
        }));
    }, [dispatch]);

    const handleOpenSubcategorySheet = useCallback(() => {
        dispatch(openBottomSheet({
            type: BOTTOM_SHEET.SUBCATEGORY_SELECT,
            height: "75%"
        }));
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <Icon name={"landScape"} size={100}/>
            <Text variant="titleLarge" style={styles.title}>Select Category</Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
                Please select a category to create your request
            </Text>
            
            <View style={styles.dropdownsContainer}>
                <View style={styles.fieldWrapper}>
                    {showSubCategory && <Text style={styles.fieldLabel}>Category</Text>}
                    <TouchableOpacity 
                        onPress={handleOpenCategorySheet}
                        activeOpacity={0.7}
                    >
                        <TextInput
                            value={category?.label || ''}
                            placeholder="Select category"
                            editable={false}
                            mode="outlined"
                            style={styles.input}
                            right={<TextInput.Icon icon="chevron-down" />}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>
                </View>

                {showSubCategory && (
                    <View style={styles.fieldWrapper}>
                        <Text style={styles.fieldLabel}>Subcategory</Text>
                        <TouchableOpacity 
                            onPress={handleOpenSubcategorySheet}
                            activeOpacity={0.7}
                        >
                            <TextInput
                                value={subCategory?.label || ''}
                                placeholder="Select subcategory"
                                editable={false}
                                mode="outlined"
                                style={styles.input}
                                right={<TextInput.Icon icon="chevron-down" />}
                                pointerEvents="none"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    title: {
        marginTop: 24,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        marginBottom: 32,
        textAlign: 'center',
        color: '#74717A',
    },
    dropdownsContainer: {
        width: '100%',
        gap: 16,
    },
    fieldWrapper: {
        width: '100%',
    },
    fieldLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#fff',
    },
});