import {View, Text, StyleSheet, TouchableOpacity, TextStyle} from "react-native";
import type {ViewStyle} from "react-native";
import Icon, {type IconType} from "../Icon/Icon";
import {useTheme} from "react-native-paper";
import {useEffect, useState} from "react";

interface IData {
    label: any;
    value: any;
}

interface IProps {
    data: Array<IData>,
    multiSelect?: boolean,
    onChange: (value: Array<IData>) => void,
    value?: Array<IData>,
    containerStyle?: ViewStyle,
    checkboxContainerStyle?: ViewStyle,
    textStyle?: TextStyle,
    icon?: IconType,
}

interface IItemProps {
    data: IData;
    isChecked: boolean;
    onToggle: (data: IData) => void;
    checkboxContainerStyle?: ViewStyle;
    textStyle?: TextStyle;
    icon?: IconType;
}

const CheckBoxItem = (props: IItemProps) => {
    const {
        checkboxContainerStyle,
        textStyle,
        icon = "checkmarkIcon",
        onToggle,
        isChecked,
        data
    } = props;
    const theme = useTheme();

    return <TouchableOpacity
        style={[
            styles.checkboxContainerStyle,
            checkboxContainerStyle
        ]}
        onPress={() => onToggle(data)}
        key={data.value}>
        <Text style={[styles.textStyle, textStyle]}>{data.label}</Text>
        {isChecked && <Icon name={icon} size={18} color={theme.colors.primary}/>}
    </TouchableOpacity>
}


export default function CustomCheckBox(props: IProps) {
    const {data, multiSelect = false, onChange, value, ...rest} = props;
    const [selectedItems, setSelectedItems] = useState<Array<IData>>(value ?? []);

    // keep internal state in sync with external value (e.g., saved selections)
    useEffect(() => {
        if (value) {
            setSelectedItems(value);
        }
    }, [value]);

    const handleToggle = (item: IData) => {
        let newSelectedItems: Array<IData>;

        if (multiSelect) {
            // Multi-select: toggle the item
            const isAlreadySelected = selectedItems.some(
                selected => selected.value === item.value
            );

            if (isAlreadySelected) {
                newSelectedItems = selectedItems.filter(
                    selected => selected.value !== item.value
                );
            } else {
                newSelectedItems = [...selectedItems, item];
            }
        } else {
            // Single select: replace with new item or deselect if same
            const isAlreadySelected = selectedItems.some(
                selected => selected.value === item.value
            );

            newSelectedItems = isAlreadySelected ? [] : [item];
        }

        setSelectedItems(newSelectedItems);
        onChange(newSelectedItems);
    };

    const isItemChecked = (item: IData) => {
        return selectedItems.some(selected => selected.value === item.value);
    };

    return <View>
        {
            data && data.map((item: IData, index: number) => {
                return <CheckBoxItem
                    key={item.value}
                    data={item}
                    isChecked={isItemChecked(item)}
                    onToggle={handleToggle}
                    {...rest}
                />
            })
        }
    </View>
}

const styles = StyleSheet.create({
    checkboxContainerStyle: {
        height: 55,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    textStyle: {
        fontSize: 16,
        fontWeight: "500",
    }
})