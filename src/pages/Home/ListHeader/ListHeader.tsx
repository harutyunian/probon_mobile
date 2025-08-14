import {ScrollView, StyleSheet} from "react-native";
import {Text} from "react-native-paper";
import {StoryContainer} from "../../../components/Story";
import {mockUsers} from "../../../mock/storyMock";

// For correct working flash list need to pass header part with
// another props and main list with another props, I find only this solution
export default function ListHeader() {
    return <>
        <Text variant="titleLarge" style={styles.header}>Events</Text>
        <StoryContainer users={mockUsers}/>
        <Text variant="titleLarge" style={styles.header}>Top Offers</Text>
    </>
}
const styles = StyleSheet.create({
    header: {
        fontWeight: '700',
        marginTop: 16,
        marginBottom: 8,
    },
    eventContainer: {
        paddingVertical: 16,
        columnGap: 16,
    },
})