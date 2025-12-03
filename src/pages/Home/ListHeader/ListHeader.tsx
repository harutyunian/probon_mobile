import {ScrollView, StyleSheet, Image as RNImage,View} from "react-native";
import {Text, useTheme} from "react-native-paper";
import {useRef, useMemo, useEffect} from "react";
import InstagramStories from '@birdwingo/react-native-instagram-stories';
import type {InstagramStoriesPublicMethods} from '@birdwingo/react-native-instagram-stories';
import Event from "../../../components/Event/Event";
import {getStatusBarHeight} from "react-native-status-bar-height";
import EventCardInfo from "./EventCardInfo/EventCardInfo";
import {mockEvent} from "../../../mock/event";


export default function ListHeader() {
    const theme = useTheme();
    const {primary} = theme.colors

    const ref = useRef<InstagramStoriesPublicMethods>(null)

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

    // Prefetch story images to reduce jank when opening modal
    useEffect(() => {
        mockEvent.forEach(user => {
            user.stories.forEach(story => {
                const uri = (story.source as any)?.uri;
                if (uri) RNImage.prefetch(uri).catch(() => undefined);
            })
        })
    }, [])

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
                statusBarTranslucent
                progressActiveColor={primary}
                loaderColor={primary}
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
        marginTop: getStatusBarHeight(true) + 50
    },
    storyProgressContainer: {
        paddingHorizontal: 8,
    },
})