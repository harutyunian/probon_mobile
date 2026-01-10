import React, { useState, useRef, useMemo, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { TextInput, List, Divider, IconButton, Portal } from 'react-native-paper';

interface DropdownOption {
    label: string;
    value: string;
}

interface SearchableDropdownProps {
    options: DropdownOption[];
    value: string | null;
    onSelect: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    label?: string;
}

// Memoized list item component to prevent unnecessary re-renders
interface DropdownListItemProps {
    option: DropdownOption;
    isSelected: boolean;
    onSelect: (option: DropdownOption) => void;
}

const DropdownListItem: React.FC<DropdownListItemProps> = React.memo(({ option, isSelected, onSelect }) => {
    const handlePress = useCallback(() => {
        onSelect(option);
    }, [option, onSelect]);

    const renderRight = useCallback((props: any) => 
        isSelected ? <List.Icon {...props} icon="check" color="#6200ee" /> : null,
        [isSelected]
    );

    return (
        <List.Item
            title={option.label}
            onPress={handlePress}
            style={[
                styles.listItem,
                isSelected && styles.selectedItem
            ]}
            titleStyle={[
                styles.listItemTitle,
                isSelected && styles.selectedItemText
            ]}
            right={renderRight}
        />
    );
});

DropdownListItem.displayName = 'DropdownListItem';

export const SearchableDropdown: React.FC<SearchableDropdownProps> = React.memo(({
                                                                   options = [],
                                                                   value = null,
                                                                   onSelect,
                                                                   placeholder = "Select category",
                                                                   searchPlaceholder = "Search...",
                                                                   label = ""
                                                               }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [dropdownTop, setDropdownTop] = useState<number>(0);
    const [dropdownLeft, setDropdownLeft] = useState<number>(0);
    const [dropdownWidth, setDropdownWidth] = useState<number>(0);
    const buttonRef = useRef<any>(null);

    // Memoize selectedOption to prevent recalculation on every render
    const selectedOption = useMemo(
        () => options.find((opt: DropdownOption) => opt.value === value),
        [options, value]
    );

    // Memoize filteredOptions to prevent recalculation on every render
    const filteredOptions = useMemo(
        () => options.filter((option: DropdownOption) =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        [options, searchQuery]
    );

    // Memoize handlers to prevent recreating functions
    const openDropdown = useCallback((): void => {
        if (buttonRef.current) {
            //todo: fix
            //@ts-ignore
            buttonRef.current.measure((fx, fy, width, height, px, py) => {
                setDropdownTop(py + height);
                setDropdownLeft(px);
                setDropdownWidth(width);
                setVisible(true);
            });
        }
    }, []);

    const closeDropdown = useCallback((): void => {
        setVisible(false);
        setSearchQuery('');
    }, []);

    const handleSelect = useCallback((option: DropdownOption): void => {
        onSelect(option.value);
        setVisible(false);
        setSearchQuery('');
    }, [onSelect]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                ref={buttonRef}
                onPress={openDropdown}
                style={styles.selectButton}
                activeOpacity={0.7}
            >
                <View style={styles.selectContent}>
                    <TextInput
                        value={selectedOption ? selectedOption.label : ''}
                        placeholder={placeholder}
                        editable={false}
                        mode="outlined"
                        style={styles.input}
                        right={<TextInput.Icon icon={visible ? "chevron-up" : "chevron-down"} />}
                        pointerEvents="none"
                    />
                </View>
            </TouchableOpacity>

            <Portal>
                <Modal
                    visible={visible}
                    transparent
                    animationType="fade"
                    onRequestClose={closeDropdown}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        activeOpacity={1}
                        onPress={closeDropdown}
                    >
                        <View
                            style={[
                                styles.dropdownContainer,
                                {
                                    top: dropdownTop,
                                    left: dropdownLeft,
                                    width: dropdownWidth,
                                }
                            ]}
                        >
                            <TouchableOpacity activeOpacity={1}>
                                <View style={styles.searchContainer}>
                                    <TextInput
                                        placeholder={searchPlaceholder}
                                        value={searchQuery}
                                        onChangeText={setSearchQuery}
                                        mode="outlined"
                                        style={styles.searchInput}
                                        left={<TextInput.Icon icon="magnify" />}
                                        autoFocus
                                    />
                                </View>

                                <Divider />

                                <ScrollView
                                    style={styles.optionsList}
                                    nestedScrollEnabled
                                    keyboardShouldPersistTaps="handled"
                                >
                                    {filteredOptions.length > 0 ? (
                                        filteredOptions.map((option, index) => {
                                            const isSelected = value === option.value;
                                            return (
                                                <React.Fragment key={option.value}>
                                                    <DropdownListItem
                                                        option={option}
                                                        isSelected={isSelected}
                                                        onSelect={handleSelect}
                                                    />
                                                    {index < filteredOptions.length - 1 && <Divider />}
                                                </React.Fragment>
                                            );
                                        })
                                    ) : (
                                        <List.Item
                                            title="No results found"
                                            titleStyle={styles.noResultsText}
                                        />
                                    )}
                                </ScrollView>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </Portal>
        </View>
    );
});

SearchableDropdown.displayName = 'SearchableDropdown';

const styles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    header: {
        marginBottom: 24,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerDescription: {
        fontSize: 14,
        marginTop: 4,
    },
    form: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        elevation: 2,
    },
    container: {
        width: '100%',
    },
    selectButton: {
        width: '100%',
    },
    selectContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    dropdownContainer: {
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 4,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        maxHeight: 400,
    },
    searchContainer: {
        padding: 8,
        backgroundColor: '#fff',
    },
    searchInput: {
        backgroundColor: '#fff',
    },
    optionsList: {
        maxHeight: 300,
    },
    listItem: {
        paddingVertical: 8,
    },
    listItemTitle: {
        fontSize: 16,
    },
    selectedItem: {
        backgroundColor: '#f0e6ff',
    },
    selectedItemText: {
        color: '#6200ee',
        fontWeight: '600',
    },
    noResultsText: {
        color: '#999',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    spacing: {
        height: 16,
    },
    resultContainer: {
        marginTop: 24,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
});