import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, useTheme, Button} from 'react-native-paper';

export default function Wishlist() {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.title}>
                Your Wishlist is Empty
            </Text>
            <Text variant="bodyMedium" style={styles.description}>
                Looks like you haven't added anything to your wishlist yet.
            </Text>
            <Button
                mode="contained"
                style={styles.button}
            >
                Start Exploring
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#fff',
    },
    title: {
        marginBottom: 12,
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
        marginBottom: 24,
        color: '#666',
    },
    button: {
        borderRadius: 24,
        paddingHorizontal: 16,
    },
});
