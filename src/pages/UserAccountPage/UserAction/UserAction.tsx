import React from 'react'
import {Text, Pressable, StyleSheet} from "react-native";
import Icon from "../../../components/Icon/Icon";
import type {IconType} from "../../../components/Icon/Icon";


export interface IUserActionProps {
    iconName: IconType;
    name: string;
    onPress?: () => void;
}

export default function UserAction(props: IUserActionProps) {
    const {iconName, onPress, name} = props;
    return (
        <Pressable
            style={styles.container}
            onPress={onPress}
        ><Icon name={iconName} color={"#74717A"} size={20} />
            <Text>{name}</Text>
        </Pressable>)
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        columnGap: 16,
        flexDirection: 'row',
        height: 48,
    },
    name: {
        color: "#171321",
        fontSize: 16,
        fontWeight: "400",
    }
})