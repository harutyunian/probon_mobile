import {Platform, ScrollView, StatusBar, StyleSheet, View, ViewStyle} from "react-native";
import {Text, useTheme, Button} from "react-native-paper";
import {useRef, useMemo} from "react";
import {IMAGES_LIST} from "../../../mock/mock";
import InstagramStories from '@birdwingo/react-native-instagram-stories';
import type {InstagramStoriesProps, InstagramStoriesPublicMethods} from '@birdwingo/react-native-instagram-stories';
import Event from "../../../components/Event/Event";
import {getStatusBarHeight} from "react-native-status-bar-height";
import EventCardInfo from "./EventCardInfo/EventCardInfo";
import {mockEvent} from "../../../mock/event"; // install if not yet

// another props and main list with another props, I find only this solution
export default function ListHeader() {
    const theme = useTheme();

    const ref = useRef<InstagramStoriesPublicMethods>(null)


    const aper: InstagramStoriesProps["stories"] = mockEvent;
    // Use Event component as custom avatar renderer and open story on press
    const stories = useMemo(() => mockEvent.map(user => ({
        ...user,
        stories: user.stories.map((el) => {
            return {
                ...el,
                renderContent: () => <EventCardInfo/>,
            }
        }),
        renderAvatar: () => (
            <Event
                title={user.name || ''}
                imageUrl={(user.avatarSource as any)?.uri}
                onPress={() => ref.current?.show(user.id)}
            />
        ),
    })), [mockEvent]);

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
                avatarBorderRadius={8}
                hideAvatarList={false}
                storyAnimationDuration={300}
                modalAnimationDuration={300}
                backgroundColor={'rgba(0,0,0,0.5)'}
                imageStyles={styles.storyImage}
                imageProps={{resizeMode: 'cover'}}
                containerStyle={styles.storyContainer}
                avatarBorderColors={[theme.colors.primary]}
                mediaContainerStyle={styles.storyMediaContainer}
                progressContainerStyle={styles.storyProgressContainer}
                avatarListContainerStyle={styles.avatarListContainerStyle}
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
    avatarListContainerStyle: {
        columnGap: 16,
    },
    // storyContainer: {
    //     height: '90%',
    //     marginBottom: 200,
    //     position: 'absolute',
    //     borderRadius: 24,
    //     overflow: 'hidden',
    //     backgroundColor: 'tomato',
    // },
    storyMediaContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    storyImage: {
        width: '100%',
        height: '100%',
    },
    storyContainer: {
        flex: 1,
        borderRadius: 24,
        overflow: "hidden",
        // backgroundColor: "transparent",
        marginTop: getStatusBarHeight(true) + 50
    },
    storyProgressContainer: {
        paddingHorizontal: 8,
    },
})