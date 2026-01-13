import {ReactNode} from 'react';

export type StoryMedia = {
  id: string;
  uri: string;
  durationMs?: number;
  title?: string;
  description?: string;
  postedAt?: string | Date;
  overlay?: ReactNode | (() => ReactNode);
};

export type StoryUser = {
  id: string;
  name: string;
  avatarUri: string;
  stories: StoryMedia[];
};

export interface StoryViewerProps {
  users: StoryUser[];
  initialUserIndex?: number;
  initialStoryIndex?: number;
  onClose: () => void;
}