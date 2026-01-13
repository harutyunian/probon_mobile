import React, {useCallback, useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import Event from '../Event/Event';
import {StoryUser} from '../../types/story';
import {StoryStateController, useStoryState} from '../../hooks/useStoryState';
import StoryViewer from './StoryViewer';

type Props = {
  users: StoryUser[];
};

const keyExtractor = (item: StoryUser) => item.id;

export default function Stories({users}: Props) {
  const controller: StoryStateController = useStoryState({
    users,
  });

  const openStoryAt = useCallback(
    (userIndex: number) => {
      controller.openStory(userIndex, 0);
    },
    [controller],
  );

  const data = useMemo(() => users, [users]);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={({item, index}) => (
          <Event
            title={item.name}
            imageUrl={item.avatarUri}
            hasUnviewedStories={item.stories.some(story => !controller.viewedStoryIds.has(story.id))}
            onPress={() => openStoryAt(index)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{width: 12}} />}
      />

      <StoryViewer users={users} controller={controller} />
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 16,
    paddingRight: 4,
  },
});
