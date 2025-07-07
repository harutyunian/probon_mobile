// components/CustomHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {TextInput, useTheme} from "react-native-paper";

export const CustomHeader = (props: any) => {
   const { route:{name}} = props;
    console.log("CustomHeader", props);

    const theme = useTheme();

    return (
        <View style={[styles.header, {backgroundColor: theme.colors.primary}]}>
            <Text>Xndzor</Text>
            <TextInput style={styles.input}/>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'yellow',
        padding: 12,
        height: 162,
        // borderBottomEndRadius: 16,
        // borderBottomStartRadius: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 340,
        height: 56,
    },
});
