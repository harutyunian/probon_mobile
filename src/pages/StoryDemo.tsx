import React, {useMemo} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Text as PaperText} from 'react-native-paper';

import Stories from '../components/Stories/Stories';
import {mockUsers} from '../mock/storyMock';
import EventCardInfo from './Home/ListHeader/EventCardInfo/EventCardInfo';

export default function StoryDemo() {
  const demoStories = useMemo(
    () =>
      mockUsers.map(user => ({
        ...user,
        stories: user.stories.map(story => ({
          ...story,
          overlay: <EventCardInfo />,
        })),
      })),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PaperText variant="headlineMedium" style={styles.title}>
          Story System Demo
        </PaperText>
        <PaperText variant="bodyMedium" style={styles.subtitle}>
          Tap on any story to view it
        </PaperText>
      </View>

      <Stories users={demoStories} />

      <View style={styles.info}>
        <PaperText variant="bodyMedium" style={styles.infoText}>
          Features:
        </PaperText>
        <PaperText variant="bodySmall" style={styles.featureText}>
          • Tap left/right to navigate between stories
        </PaperText>
        <PaperText variant="bodySmall" style={styles.featureText}>
          • Play/pause controls in the header
        </PaperText>
        <PaperText variant="bodySmall" style={styles.featureText}>
          • Progress bars for every story
        </PaperText>
        <PaperText variant="bodySmall" style={styles.featureText}>
          • Automatic advance across users
        </PaperText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
  },
  info: {
    padding: 20,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoText: {
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  featureText: {
    color: '#666',
    marginBottom: 6,
    lineHeight: 20,
  },
});