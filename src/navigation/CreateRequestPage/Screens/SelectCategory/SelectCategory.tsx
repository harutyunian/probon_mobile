import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import Icon from "../../../../components/Icon/Icon";
import {IRequestFormCategory} from "../../../../types/requestFormSlice";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {
    setCreateRequestForm,
    setCreateRequestFormField
} from "../../../../store/createRequestFormSlice/createRequestFormSlice";
import {SearchableDropdown} from "../../../../components/SearchableDropDown/SearchableDropDown";

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
    
    // Optimize Redux selector to only extract what we need
    const category = useAppSelector(state => state.createRequestForm.form.category);
    const subCategory = useAppSelector(state => state.createRequestForm.form.subCategory);

    // Memoize derived values
    const showSubCategory = useMemo(
        () => category?.value !== null && category?.value !== "",
        [category?.value]
    );

    const subCategoryItems = useMemo(
        () => category?.value && SUBCATEGORIES[category.value]
            ? SUBCATEGORIES[category.value]
            : [],
        [category?.value]
    );

    const handleChangeCategory = useCallback((value: string) => {
        // Don't dispatch if same value is selected
        if (category?.value === value) {
            return;
        }

        const selectedItem = CATEGORIES.find(item => item.value === value);
        if (selectedItem) {
            dispatch(setCreateRequestFormField({
                category: {label: selectedItem.label, value: selectedItem.value}
            }));
            dispatch(setCreateRequestFormField({
                subCategory: {label: "", value: ""}
            }));
            dispatch(setCreateRequestForm({nextButtonDisabled: true}));
        }
    }, [dispatch, category?.value]);

    const handleChangeSubCategory = useCallback((value: string) => {
        // Don't dispatch if same value is selected
        if (subCategory?.value === value) {
            return;
        }

        const selectedItem = subCategoryItems.find(item => item.value === value);
        if (selectedItem) {
            dispatch(setCreateRequestFormField({
                subCategory: {label: selectedItem.label, value: selectedItem.value}
            }));
            dispatch(setCreateRequestForm({nextButtonDisabled: false, disableRequest: false}));
        }
    }, [dispatch, subCategoryItems, subCategory?.value]);

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
                    <SearchableDropdown
                        options={CATEGORIES}
                        value={category?.value || null}
                        onSelect={handleChangeCategory}
                        placeholder="Select category"
                        searchPlaceholder="Search categories..."
                    />
                </View>

                {showSubCategory && (
                    <View style={styles.fieldWrapper}>
                        <Text style={styles.fieldLabel}>Subcategory</Text>
                        <SearchableDropdown
                            options={subCategoryItems}
                            value={subCategory?.value || null}
                            onSelect={handleChangeSubCategory}
                            placeholder="Select subcategory"
                            searchPlaceholder="Search subcategories..."
                        />
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
});