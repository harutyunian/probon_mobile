import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';

function UserRequestsPage() {
    const {colors} = useTheme();

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <MaterialCommunityIcons
                name="file-question-outline"
                size={80}
                color={colors.onSurfaceDisabled}
                style={styles.icon}
            />
            <Text variant="headlineSmall" style={[styles.title, {color: colors.onSurface}]}>
                No Requests Yet
            </Text>
            <Text variant="bodyLarge" style={[styles.description, {color: colors.onSurfaceVariant}]}>
                It looks like you haven't made any requests. When you do, they'll show up right here.
            </Text>
            <Button
                mode="contained"
                onPress={() => console.log('Navigate to create request screen')}
                style={styles.button}
                labelStyle={styles.buttonLabel}
            >
                Make a New Request
            </Button>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#F5F5F5', // A light background for the page
    },
    icon: {
        marginBottom: 24,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 22,
    },
    button: {
        borderRadius: 50, // Fully rounded
        paddingVertical: 8,
        paddingHorizontal: 24,
        elevation: 2, // Subtle shadow for Android
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: '600',
    }
});

export default memo(UserRequestsPage);