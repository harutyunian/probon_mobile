import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { User } from '../../types/story';

interface StoryRowProps {
  users: User[];
  onStoryPress: (userIndex: number, storyIndex: number) => void;
}

export default function StoryRow({ users, onStoryPress }: StoryRowProps) {
  const getFirstUnviewedStoryIndex = (user: User) => {
    return user.stories.findIndex(story => !story.viewed);
  };

  const hasUnviewedStories = (user: User) => {
    return user.stories.some(story => !story.viewed);
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {users.map((user, userIndex) => {
        const firstUnviewedIndex = getFirstUnviewedStoryIndex(user);
        const hasUnviewed = hasUnviewedStories(user);
        
        return (
          <TouchableOpacity
            key={user.id}
            style={styles.storyItem}
            onPress={() => onStoryPress(userIndex, Math.max(0, firstUnviewedIndex))}
            activeOpacity={0.8}
          >
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: user.avatar }}
                style={styles.avatar}
                contentFit="cover"
              />
              {hasUnviewed && (
                <View style={styles.unviewedIndicator} />
              )}
              {user.isOnline && (
                <View style={styles.onlineIndicator} />
              )}
            </View>
            <Text style={styles.userName} numberOfLines={1}>
              {user.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  unviewedIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B6B',
    borderWidth: 2,
    borderColor: 'white',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  userName: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
}); 