import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StoryMedia, StoryUser} from '../types/story';

interface UseStoryStateProps {
  users: StoryUser[];
  onComplete?: () => void;
}

export type StoryStateController = {
  currentUserIndex: number;
  currentStoryIndex: number;
  isPlaying: boolean;
  progress: number;
  isVisible: boolean;
  currentUser?: StoryUser;
  currentStory?: StoryMedia;
  viewedStoryIds: Set<string>;
  openStory: (userIndex: number, storyIndex?: number) => void;
  closeStory: () => void;
  nextStory: () => void;
  previousStory: () => void;
  togglePlay: () => void;
  setCurrentUserIndex: (index: number) => void;
  setCurrentStoryIndex: (index: number) => void;
  markStoryViewed: (storyId?: string) => void;
};

export const useStoryState = ({users, onComplete}: UseStoryStateProps): StoryStateController => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [viewedStoryIds, setViewedStoryIds] = useState<Set<string>>(new Set());

  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const progressRef = useRef(0);

  const currentUser = useMemo(() => users[currentUserIndex], [users, currentUserIndex]);
  const currentStory = useMemo(
    () => currentUser?.stories?.[currentStoryIndex],
    [currentUser, currentStoryIndex],
  );

  const cancelAnimation = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const markStoryViewed = useCallback((storyId?: string) => {
    if (!storyId) {
      return;
    }

    setViewedStoryIds(prev => {
      if (prev.has(storyId)) {
        return prev;
      }
      const next = new Set(prev);
      next.add(storyId);
      return next;
    });
  }, []);

  const closeStory = useCallback(() => {
    setIsVisible(false);
    setIsPlaying(false);
    setProgress(0);
    progressRef.current = 0;
    cancelAnimation();
  }, [cancelAnimation]);

  const nextStory = useCallback(() => {
    const userStories = users[currentUserIndex]?.stories ?? [];

    if (currentStoryIndex < userStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      return;
    }

    if (currentUserIndex < users.length - 1) {
      setCurrentStoryIndex(0);
      setCurrentUserIndex(currentUserIndex + 1);
      return;
    }

    closeStory();
    onComplete?.();
  }, [closeStory, currentStoryIndex, currentUserIndex, onComplete, users]);

  const previousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      return;
    }

    if (currentUserIndex > 0) {
      const prevUserStories = users[currentUserIndex - 1]?.stories ?? [];
      setCurrentUserIndex(currentUserIndex - 1);
      setCurrentStoryIndex(Math.max(prevUserStories.length - 1, 0));
    }
  }, [currentStoryIndex, currentUserIndex, users]);

  const openStory = useCallback((userIndex: number, storyIndex = 0) => {
    setCurrentUserIndex(userIndex);
    setCurrentStoryIndex(storyIndex);
    setIsVisible(true);
    setIsPlaying(true);
    setProgress(0);
    progressRef.current = 0;
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  useEffect(() => {
    // Reset immediately on story change so the top progress bar restarts from 0
    cancelAnimation();
    progressRef.current = 0;
    setProgress(0);
    lastFrameRef.current = 0;
  }, [cancelAnimation, currentStory?.id]);

  // Kick off progress animation whenever the active story changes and playback is active
  useEffect(() => {
    if (!isVisible || !isPlaying || !currentStory) {
      return;
    }

    lastFrameRef.current = 0;

    const step = (timestamp: number) => {
      if (!lastFrameRef.current) {
        lastFrameRef.current = timestamp;
      }

      const elapsed = timestamp - lastFrameRef.current;
      lastFrameRef.current = timestamp;

      const duration = currentStory.durationMs ?? 6500;
      const nextProgress = Math.min(progressRef.current + elapsed / duration, 1);
      progressRef.current = nextProgress;
      setProgress(nextProgress);

      if (nextProgress >= 1) {
        nextStory();
        return;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return cancelAnimation;
  }, [cancelAnimation, currentStory, isPlaying, isVisible, nextStory]);

  // Mark as viewed when the user actually lands on a story while the viewer is open
  useEffect(() => {
    if (isVisible && currentStory?.id) {
      markStoryViewed(currentStory.id);
    }
  }, [currentStory?.id, isVisible, markStoryViewed]);

  return {
    currentUserIndex,
    currentStoryIndex,
    isPlaying,
    progress,
    isVisible,
    currentUser,
    currentStory,
    viewedStoryIds,
    openStory,
    closeStory,
    nextStory,
    previousStory,
    togglePlay,
    setCurrentUserIndex,
    setCurrentStoryIndex,
    markStoryViewed,
  };
};