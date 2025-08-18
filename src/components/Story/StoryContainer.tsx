import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { User } from '../../types/story';
import EventRow from './EventRow';
import StoryViewer from './StoryViewer';

interface Props { users: User[]; }

export default function StoryContainer({ users }: Props) {
  const [visible, setVisible] = useState(false);
  const [userIndex, setUserIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);

  return (
    <View style={styles.container}>
      <EventRow users={users} onOpen={(u, s) => { setUserIndex(u); setStoryIndex(s); setVisible(true); }} />
      {visible && (
        <StoryViewer users={users} initialUserIndex={userIndex} initialStoryIndex={storyIndex} onClose={() => setVisible(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({ container: { width: '100%' } }); 