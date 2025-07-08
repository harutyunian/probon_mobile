import {ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Event from '../../components/Event/Event';
import {MainCard} from "../../components/MainCard/MainCard";

export function Home() {

    return (
        <ScrollView style={styles.container}>
            <Text variant="titleLarge" style={styles.header}>Events</Text>
            <ScrollView
                horizontal={true}
                contentContainerStyle={styles.eventContainer}
                showsHorizontalScrollIndicator={false}
            >
                <Event/>
                <Event/>
                <Event/>
                <Event/>
            </ScrollView>

            <Text variant="titleLarge" style={styles.header}>Top Offers</Text>

            {/* This is the container for your cards */}
            <View style={styles.cardContainer}>
                {/* You must pass the "card" style to each MainCard.
                  This tells the card how much space to take up.
                */}
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensures the scroll view takes up the full screen
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    header: {
        fontWeight: '700',
        marginTop: 16,
        marginBottom: 8,
    },
    eventContainer: {
        paddingVertical: 16,
        columnGap: 16,
    },
    // --- CORRECTED STYLES FOR THE GRID ---
    cardContainer:{
        flexDirection: 'row',     // 1. Arrange items horizontally
        flexWrap: 'wrap',         // 2. Allow items to wrap to the next line
        justifyContent: 'space-between', // 3. Distribute space evenly
    },
    // 4. A new style to define the size of each card
    card: {
        flexBasis: '48%', // Each card will take up roughly 48% of the width
        marginBottom: 16, // Add space between the rows of cards
    }
});