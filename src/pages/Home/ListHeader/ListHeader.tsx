import {ScrollView, StyleSheet} from "react-native";
import {Text, useTheme} from "react-native-paper";
import Event2 from "../../../components/Event/Event2";
import {useRef} from "react";
import {IMAGES_LIST} from "../../../mock/mock";
import InstagramStories from '@birdwingo/react-native-instagram-stories';
import type {InstagramStoriesProps, InstagramStoriesPublicMethods} from '@birdwingo/react-native-instagram-stories';


// another props and main list with another props, I find only this solution
export default function ListHeader() {
    const theme = useTheme();

    const ref = useRef<InstagramStoriesPublicMethods>(null)

    const stories: InstagramStoriesProps["stories"] = [
        {
            id: 'user1',
            name: 'User 1',
            avatarSource: {uri: IMAGES_LIST[0],},
            stories: [
                {id: 'story1', source: {uri: IMAGES_LIST[0]}},
                {id: 'story2', source: {uri: IMAGES_LIST[1]},},
            ]
        },
        {
            id: 'user2',
            name: 'User 1',
            avatarSource: {uri: IMAGES_LIST[3],},
            stories: [
                {id: 'story1', source: {uri: IMAGES_LIST[3]}},
                {id: 'story2', source: {uri: IMAGES_LIST[4]},},
            ]
        },
    ];

    const setStories = () => ref.current?.setStories(stories);


    return <>
        <Text variant="titleLarge" style={styles.header}>Events</Text>
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventContainer}
        >
            <InstagramStories
                ref={ref}
                stories={stories}
                avatarBorderColors={[theme.colors.primary]}

            />
        </ScrollView>

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