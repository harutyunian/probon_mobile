import {StoryUser} from '../types/story';

const images = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1887&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1933&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1932&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1932&auto=format&fit=crop',
];

const makeStories = (start: number, count: number) =>
  Array.from({length: count}).map((_, idx) => ({
    id: `${start}-${idx + 1}`,
    uri: images[(start + idx) % images.length],
    title: `Moment ${idx + 1}`,
    durationMs: 6500,
    postedAt: new Date(Date.now() - (idx + 1) * 60 * 60 * 1000),
  }));

export const mockUsers: StoryUser[] = [
  {
    id: 'u1',
    name: 'Hyur Service',
    avatarUri:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1740&auto=format&fit=crop',
    stories: makeStories(0, 3),
  },
  {
    id: 'u2',
    name: 'One Way Tour',
    avatarUri:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1740&auto=format&fit=crop',
    stories: makeStories(2, 4),
  },
  {
    id: 'u3',
    name: 'City Events',
    avatarUri:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1740&auto=format&fit=crop',
    stories: makeStories(3, 2),
  },
  {
    id: 'u4',
    name: 'Travel Co',
    avatarUri:
      'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1740&auto=format&fit=crop',
    stories: makeStories(4, 3),
  },
];