export interface Story {
  id: string;
  imageUrl: string;
  title: string;
  duration: number; // milliseconds
  viewed: boolean;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  stories: Story[];
}

export interface StoryViewerProps {
  users: User[];
  initialUserIndex?: number;
  initialStoryIndex?: number;
  onClose: () => void;
} 