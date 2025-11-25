import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Animated,
    SafeAreaView,
    Image,
    Easing,
    View,
    Text,
} from 'react-native';

// --- Custom Hook for the "Wow" Animation Logic ---
const useWowSplashAnimation = (onFinish: () => void) => {
    // We need multiple animated values for this complex choreography
    const [animation] = useState({
        orb: new Animated.Value(0),
        reveal: new Animated.Value(0),
        shine: new Animated.Value(0),
        text: new Animated.Value(0),
    });

    useEffect(() => {
        // The choreographed animation sequence
        Animated.sequence([
            // 1. Orb appears
            Animated.timing(animation.orb, {
                toValue: 1,
                duration: 500,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            // 2. Orb transforms into the logo
            Animated.parallel([
                Animated.timing(animation.orb, {
                    toValue: 0, // Orb fades out
                    duration: 400,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(animation.reveal, {
                    toValue: 1, // Logo appears
                    duration: 600,
                    easing: Easing.out(Easing.back(1.2)), // A slight overshoot effect
                    useNativeDriver: true,
                }),
            ]),
            // 3. The shine effect sweeps across the logo
            Animated.timing(animation.shine, {
                toValue: 1,
                duration: 700,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            // 4. The text appears
            Animated.timing(animation.text, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            // 5. A final pause before finishing
            Animated.delay(1200),
        ]).start(() => {
            onFinish();
        });
    }, []);

    // --- Interpolations for Orb ---
    const orbScale = animation.orb.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    const orbOpacity = animation.orb.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.7],
    });

    // --- Interpolations for Logo Reveal ---
    const logoScale = animation.reveal;
    const logoOpacity = animation.reveal;

    // --- Interpolations for the Shine Effect ---
    const shineTranslateX = animation.shine.interpolate({
        inputRange: [0, 1],
        outputRange: [-150, 150], // Moves from left to right
    });

    // --- Interpolations for Text ---
    const textOpacity = animation.text;

    return {
        orbScale,
        orbOpacity,
        logoScale,
        logoOpacity,
        shineTranslateX,
        textOpacity,
    };
};

// --- The Main SplashScreen Component ---
const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
    const {
        orbScale,
        orbOpacity,
        logoScale,
        logoOpacity,
        shineTranslateX,
        textOpacity,
    } = useWowSplashAnimation(onFinish);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* This view is a container for the logo and the shine effect */}
                <View style={styles.logoContainer}>
                    <Animated.Image
                        source={require('../../../assets/splash_icon.png')}
                        style={[
                            styles.logo,
                            {
                                opacity: logoOpacity,
                                transform: [{ scale: logoScale }],
                            },
                        ]}
                        resizeMode="contain"
                    />
                    <Animated.View
                        style={[
                            styles.shine,
                            {
                                transform: [{ translateX: shineTranslateX }],
                            },
                        ]}
                    />
                </View>

                {/* The Orb that reveals the logo */}
                <Animated.View
                    style={[
                        styles.orb,
                        {
                            opacity: orbOpacity,
                            transform: [{ scale: orbScale }],
                        },
                    ]}
                />

                {/* The Tagline Text */}
                <Animated.View style={{ opacity: textOpacity }}>
                    <Text style={styles.title}>Your Requests</Text>
                    <Text style={styles.title}>Our Expertise</Text>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5E4DED', // Your primary color
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', // This is crucial to clip the shine effect
        marginBottom: 24,
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    orb: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'white',
    },
    shine: {
        position: 'absolute',
        width: 30,
        height: '200%', // Tall enough to create a diagonal line
        backgroundColor: 'white',
        opacity: 0.4,
        transform: [{ rotate: '25deg' }], // Angled shine
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
    },
});

export default SplashScreen;