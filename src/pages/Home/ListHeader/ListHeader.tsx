import {Platform, ScrollView, StatusBar, StyleSheet, View, ViewStyle} from "react-native";
import {Text, useTheme, Button} from "react-native-paper";
import {useRef, useMemo} from "react";
import {IMAGES_LIST} from "../../../mock/mock";
import InstagramStories from '@birdwingo/react-native-instagram-stories';
import type {InstagramStoriesProps, InstagramStoriesPublicMethods} from '@birdwingo/react-native-instagram-stories';
import Event from "../../../components/Event/Event";
import { getStatusBarHeight } from "react-native-status-bar-height"; // install if not yet

// another props and main list with another props, I find only this solution
export default function ListHeader() {
    const theme = useTheme();

    const ref = useRef<InstagramStoriesPublicMethods>(null)

    const baseStories: InstagramStoriesProps["stories"]= [
        {
            id: 'user1',
            name: 'Hyur Service',
            avatarSource: {uri: IMAGES_LIST[0]},
            stories: [
                {id: 'story1', source: {uri: IMAGES_LIST[0]}},
                {
                    id: 'story2',
                    source: {uri: IMAGES_LIST[1]},
                    renderContent: () => (
                        <View style={styles.overlayWrap}>
                            <View style={styles.overlayCard}>
                                <Text style={styles.overlayBy}>By One Way Tour</Text>
                                <Text style={styles.overlayTitle}>Wine days in Dilijan</Text>
                                <Text style={styles.overlayMeta}>Dilijan, Armenia</Text>
                                <Text style={styles.overlayMeta}>Jul 3 - Jul 12</Text>
                                <Text style={styles.overlayDesc}>
                                    Get to know Abu Dhabi on a day trip from Dubai that lets you explore the largest emirate on a time budget. All transportation is included
                                </Text>
                                <Button
                                    mode="contained"
                                    onPress={() => console.log('See more')}
                                    style={styles.overlayButton}
                                >
                                    See more
                                </Button>
                            </View>
                        </View>
                    ),
                },
            ]
        },
        {
            id: 'user2',
            name: 'Hyur Service',
            avatarSource: {uri: IMAGES_LIST[3]},
            stories: [
                {
                    id: 'story1',
                    source: {uri: IMAGES_LIST[3]},
                    renderContent: () => (
                        <View style={styles.overlayWrap}>
                            <View style={styles.overlayCard}>
                                <Text style={styles.overlayBy}>By One Way Tour</Text>
                                <Text style={styles.overlayTitle}>Seaside Weekend</Text>
                                <Text style={styles.overlayMeta}>Batumi, Georgia</Text>
                                <Text style={styles.overlayMeta}>Aug 18 - Aug 22</Text>
                                <Text style={styles.overlayDesc}>
                                    Enjoy the sea, sun, and city vibes with an affordable weekend escape. Transfers included
                                </Text>
                                <Button
                                    mode="contained"
                                    onPress={() => console.log('See more')}
                                    style={styles.overlayButton}
                                >
                                    See more
                                </Button>
                            </View>
                        </View>
                    ),
                },
                {id: 'story2', source: {uri: IMAGES_LIST[4]}},
            ]
        },
    ];

    // Use Event component as custom avatar renderer and open story on press
    const stories = useMemo(() => baseStories.map(user => ({
        ...user,
        renderAvatar: () => (
            <Event
                title={user.name || ''}
                imageUrl={(user.avatarSource as any)?.uri}
                onPress={() => ref.current?.show(user.id)}
            />
        ),
    })), [baseStories]);

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
                backgroundColor={'rgba(0,0,0,0.5)'}
                imageStyles={styles.storyImage}
                imageProps={{ resizeMode: 'cover' }}
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
    overlayWrap: {
        position: 'absolute',
        left: 12,
        right: 12,
        bottom: 100,
        alignItems: 'center',

    },
    overlayCard: {
        backgroundColor: 'rgba(0,0,0,0.55)',
        borderRadius: 16,
        padding: 16,
        width: '92%',
        alignSelf: 'center',
    },
    overlayBy: {
        color: 'rgba(255,255,255,0.85)',
        marginBottom: 4,
        fontSize: 12,
    },
    overlayTitle: {
        color: 'white',
        fontWeight: '800',
        fontSize: 22,
        marginBottom: 8,
    },
    overlayMeta: {
        color: 'white',
        opacity: 0.9,
        marginBottom: 6,
    },
    overlayDesc: {
        color: 'white',
        opacity: 0.9,
        marginTop: 8,
        marginBottom: 14,
    },
    overlayButton: {
        alignSelf: 'stretch',
        borderRadius: 28,
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
        marginTop: getStatusBarHeight(true) +50
    },
    storyProgressContainer: {
        paddingHorizontal: 8,
    },
})