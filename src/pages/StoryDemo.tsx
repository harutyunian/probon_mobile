import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Text as PaperText } from 'react-native-paper';
import { StoryContainer } from '../components/Story';
import { mockUsers } from '../mock/storyMock';

export default function StoryDemo() {
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
      
      <StoryContainer users={mockUsers} />
      
      <View style={styles.info}>
        <PaperText variant="bodyMedium" style={styles.infoText}>
          Features:
        </PaperText>
        <PaperText variant="bodySmall" style={styles.featureText}>
          • Tap left/right to navigate between stories
        </PaperText>
        <PaperText variant="bodySmall" style={styles.featureText}>
          • Use play/pause button to control story progression
        </PaperText>
        <PaperText variant="bodySmall" style={styles.featureText}>
          • Mute/unmute sound with volume button
        </PaperText>
        <PaperText variant="bodySmall" style={styles.featureText}>
          • Progress bars show story completion
        </PaperText>
        <PaperText variant="bodySmall" style={styles.featureText}>
          • Stories automatically progress to next user
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
    shadowOffset: { width: 0, height: 2 },
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