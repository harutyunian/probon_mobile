# Story System Components

This directory contains a complete Facebook Stories-like implementation for React Native with TypeScript and Expo.

## Components

### StoryContainer
The main container component that manages the story state and coordinates between the story row and story viewer.

**Props:**
- `users: User[]` - Array of users with their stories

**Usage:**
```tsx
import { StoryContainer } from '../components/Story';
import { mockUsers } from '../mock/storyMock';

<StoryContainer users={mockUsers} />
```

### StoryRow
Displays a horizontal scrollable row of story previews with user avatars and unviewed indicators.

**Props:**
- `users: User[]` - Array of users
- `onStoryPress: (userIndex: number, storyIndex: number) => void` - Callback when a story is tapped

### StoryViewer
The full-screen story viewer with navigation, progress bars, and controls.

**Props:**
- `users: User[]` - Array of users
- `initialUserIndex?: number` - Starting user index
- `initialStoryIndex?: number` - Starting story index
- `onClose: () => void` - Callback when story viewer is closed

### StoryProgress
Progress bars showing the completion status of each story for the current user.

### StoryHeader
Header with user information and close button.

### StoryControls
Play/pause and sound control buttons.

## Types

### User
```tsx
interface User {
  id: string;
  name: string;
  avatar: string;
  stories: Story[];
  isOnline: boolean;
}
```

### Story
```tsx
interface Story {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  duration: number; // in milliseconds
  viewed: boolean;
  timestamp: Date;
}
```

## Features

- **Automatic Progression**: Stories automatically progress to the next story/user
- **Navigation**: Tap left/right to navigate between stories
- **Play/Pause Control**: Control story progression manually
- **Sound Control**: Mute/unmute functionality
- **Progress Tracking**: Visual progress bars for each story
- **User Switching**: Automatic progression between users
- **Viewed State**: Tracks which stories have been viewed
- **Online Status**: Shows user online/offline status

## Usage Example

```tsx
import React from 'react';
import { View } from 'react-native';
import { StoryContainer } from './components/Story';
import { mockUsers } from './mock/storyMock';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StoryContainer users={mockUsers} />
    </View>
  );
}
```

## Mock Data

Use the provided `mockUsers` array from `../mock/storyMock` for testing and development.

## Customization

The components use React Native Paper for consistent theming and can be easily customized by modifying the StyleSheet objects in each component.

## Dependencies

- `react-native`
- `expo-image`
- `react-native-paper`
- `react-native-vector-icons`
- `react-native-gesture-handler` 