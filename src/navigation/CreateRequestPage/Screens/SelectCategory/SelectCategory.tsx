import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import Icon from "../../../../components/Icon/Icon";
import {useState} from "react";
import DropDownPicker, {ItemType} from "react-native-dropdown-picker";
import {IRequestFormCategory} from "../../../../types/requestFormSlice";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {
    setCreateRequestForm,
    setCreateRequestFormField
} from "../../../../store/createRequestFormSlice/createRequestFormSlice";

const CATEGORIES: Array<IRequestFormCategory> = [
    {label: "Entertainment", value: "entertainment"},
    {label: "Travel", value: "travel"}
];

const SUBCATEGORIES: Record<string, Array<IRequestFormCategory>> = {
    entertainment: [
        {label: "Movies", value: "movies"},
        {label: "Music", value: "music"},
        {label: "Sports", value: "sports"},
        {label: "Events", value: "events"}
    ],
    travel: [
        {label: "Hotels", value: "hotels"},
        {label: "Flights", value: "flights"},
        {label: "Tours", value: "tours"},
        {label: "Activities", value: "activities"}
    ]
};

export default function SelectCategory() {
    const dispatch = useAppDispatch();
    const {category, subCategory} = useAppSelector(state => state.createRequestForm.form);

    // Only manage open/close state locally
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [subCategoryOpen, setSubCategoryOpen] = useState(false);

    const showSubCategory = category?.value !== null && category?.value !== "";
    const subCategoryItems = category?.value && SUBCATEGORIES[category.value]
        ? SUBCATEGORIES[category.value]
        : [];

    const handleChangeCategory = (item: ItemType<string>) => {
        if (item.label && item.value) {
            dispatch(setCreateRequestFormField({
                category: {label: item.label, value: item.value}
            }));
            // Reset subcategory when category changes
            dispatch(setCreateRequestFormField({
                subCategory: {label: "", value: ""}
            }));
            dispatch(setCreateRequestForm({nextButtonDisabled: true}));
        }
    };

    const handleChangeSubCategory = (item: ItemType<string>) => {
        if (item?.label && item?.value) {

            dispatch(setCreateRequestFormField({
                subCategory: {label: item.label, value: item.value}
            }));
            dispatch(setCreateRequestForm({nextButtonDisabled: false}));

        }

    };

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
                    <View
                        style={[styles.dropdownContainer, {zIndex: categoryOpen ? 3000 : (showSubCategory ? 2000 : 3000)}]}>
                        <DropDownPicker
                            open={categoryOpen}
                            value={category?.value || null}
                            items={CATEGORIES}
                            setOpen={(open) => {
                                setCategoryOpen(open);
                                // todo: partadir fixel
                                //@ts-ignore
                                if (open) {
                                    setSubCategoryOpen(false);
                                }
                            }}
                            onSelectItem={handleChangeCategory}
                            setValue={() => {
                            }} // No-op since we handle in onSelectItem
                            setItems={() => {
                            }} // No-op since CATEGORIES is constant
                            placeholder="Select category"
                            searchable={true}
                            searchPlaceholder="Search categories..."
                            theme="LIGHT"
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownMenu}
                            textStyle={styles.dropdownText}
                            selectedItemLabelStyle={styles.selectedItemLabel}
                            listItemLabelStyle={styles.listItemLabel}
                            placeholderStyle={styles.placeholderStyle}
                            searchContainerStyle={styles.searchContainer}
                            searchTextInputStyle={styles.searchInput}
                            arrowIconStyle={styles.arrowIcon}
                            tickIconStyle={styles.tickIcon}
                            zIndex={categoryOpen ? 3000 : (showSubCategory ? 2000 : 3000)}
                            zIndexInverse={categoryOpen ? 1000 : (showSubCategory ? 2000 : 1000)}
                            showArrowIcon={true}
                        />
                    </View>
                </View>

                {showSubCategory && (
                    <View style={styles.fieldWrapper}>
                        <Text style={styles.fieldLabel}>Subcategory</Text>
                        <View style={[styles.dropdownContainer, {zIndex: subCategoryOpen ? 3000 : 1000}]}>
                            <DropDownPicker
                                open={subCategoryOpen}
                                value={subCategory?.value || null}
                                items={subCategoryItems}
                                setOpen={(open) => {
                                    setSubCategoryOpen(open);
                                    // todo: partadir fixel
                                    //@ts-ignore
                                    if (open) {
                                        setCategoryOpen(false);
                                    }
                                }}
                                onSelectItem={handleChangeSubCategory}
                                setValue={() => {
                                }} // No-op since we handle in onSelectItem
                                setItems={() => {
                                }} // No-op since items are derived
                                placeholder="Select subcategory"
                                searchable={true}
                                searchPlaceholder="Search subcategories..."
                                theme="LIGHT"
                                style={styles.dropdown}
                                dropDownContainerStyle={styles.dropdownMenu}
                                textStyle={styles.dropdownText}
                                selectedItemLabelStyle={styles.selectedItemLabel}
                                listItemLabelStyle={styles.listItemLabel}
                                placeholderStyle={styles.placeholderStyle}
                                searchContainerStyle={styles.searchContainer}
                                searchTextInputStyle={styles.searchInput}
                                arrowIconStyle={styles.arrowIcon}
                                tickIconStyle={styles.tickIcon}
                                zIndex={subCategoryOpen ? 3000 : 1000}
                                zIndexInverse={subCategoryOpen ? 1000 : 2000}
                                showArrowIcon={true}
                            />
                        </View>
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
    dropdownContainer: {
        width: '100%',
        zIndex: 1,
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
    dropdown: {
        backgroundColor: '#fff',
        borderColor: '#E0E0E0',
        borderRadius: 12,
        borderWidth: 1,
        minHeight: 56,
    },
    dropdownMenu: {
        backgroundColor: '#fff',
        borderColor: '#E0E0E0',
        borderRadius: 12,
        borderWidth: 1,
        marginTop: 4,
    },
    dropdownText: {
        fontSize: 16,
        color: '#000',
    },
    selectedItemLabel: {
        color: '#5E4DED',
        fontWeight: '600',
    },
    listItemLabel: {
        color: '#000',
    },
    placeholderStyle: {
        color: '#74717A',
    },
    searchContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingBottom: 8,
        marginBottom: 8,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
    },
    arrowIcon: {
        width: 20,
        height: 20,
    },
    tickIcon: {
        width: 18,
        height: 18,
    },
});