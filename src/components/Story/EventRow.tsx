import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Event from '../Event/Event';
import { User } from '../../types/story';

interface Props {
  users: User[];
  onOpen: (userIndex: number, initialStoryIndex: number) => void;
}

export default function EventRow({ users, onOpen }: Props) {
  const firstUnviewedIndex = (user: User) => {
    const idx = user.stories.findIndex(s => !s.viewed);
    return idx === -1 ? 0 : idx;
    };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {users.map((u, i) => (
        <Event
          key={u.id}
          title={u.name}
          imageUrl={u.stories[0]?.imageUrl}
          hasUnviewedStories={u.stories.some(s => !s.viewed)}
          onPress={() => onOpen(i, firstUnviewedIndex(u))}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({ row: { paddingVertical: 16, columnGap: 16, paddingHorizontal: 0 } });