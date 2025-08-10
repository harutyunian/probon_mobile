import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Story } from '../../types/story';

interface Props {
  stories: Story[];
  currentStoryIndex: number;
  progress: number; // 0..1
  topOffset?: number;
}

export default function StoryProgress({ stories, currentStoryIndex, progress, topOffset = 48 }: Props) {
  return (
    <View style={[styles.container, { top: topOffset }] }>
      {stories.map((story, index) => (
        <View key={story.id} style={styles.track}>
          <View
            style={[
              styles.bar,
              { width: index < currentStoryIndex ? '100%' : index === currentStoryIndex ? `${progress * 100}%` : '0%' },
            ]}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 12,
    right: 12,
    flexDirection: 'row',
    gap: 4,
    zIndex: 20,
  },
  track: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#fff',
  },
}); 