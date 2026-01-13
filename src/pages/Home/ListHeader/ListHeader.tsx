import {StyleSheet, Image as RNImage} from 'react-native';
import {Text} from 'react-native-paper';
import {useMemo, useEffect} from 'react';

import Stories from '../../../components/Stories/Stories';
import EventCardInfo from './EventCardInfo/EventCardInfo';
import {mockEvent} from '../../../mock/event';

export default function ListHeader() {
    const stories = useMemo(
        () =>
            mockEvent.map(user => ({
                id: user.id,
                name: user.name,
                avatarUri: (user.avatarSource as any)?.uri ?? '',
                stories: user.stories.map(story => ({
                    id: story.id,
                    uri: (story.source as any)?.uri ?? '',
                    durationMs: story.durationMs ?? 6500,
                    overlay: <EventCardInfo/>,
                    postedAt: story.postedAt,
                })),
            })),
        [],
    );

    // Prefetch story images to reduce jank when opening modal
    useEffect(() => {
        stories.forEach(user => {
            user.stories.forEach(story => {
                if (story.uri) RNImage.prefetch(story.uri).catch(() => undefined);
            });
        });
    }, [stories]);

    return (
        <>
            <Text variant="titleLarge" style={styles.header}>Events</Text>
            <Stories users={stories}/>
            <Text variant="titleLarge" style={styles.header}>Top Offers</Text>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        fontWeight: '700',
        marginTop: 16,
        marginBottom: 8,
    },
});