import { useState, useCallback, useRef, useEffect } from 'react';
import { User, Story } from '../types/story';

interface UseStoryStateProps {
  users: User[];
  onComplete?: () => void;
}

export const useStoryState = ({ users, onComplete }: UseStoryStateProps) => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const currentUser = users[currentUserIndex];
  const currentStory = currentUser?.stories[currentStoryIndex];

  // Progress timer
  useEffect(() => {
    if (!isPlaying || !currentStory || !isVisible) return;

    const startTime = Date.now();
    const duration = currentStory.duration;

    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      
      setProgress(newProgress);

      if (newProgress >= 1) {
        nextStory();
      }
    }, 50);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentUserIndex, currentStoryIndex, isPlaying, currentStory, isVisible]);

  // Reset progress when story changes
  useEffect(() => {
    setProgress(0);
  }, [currentUserIndex, currentStoryIndex]);

  const nextStory = useCallback(() => {
    if (currentStoryIndex < currentUser.stories.length - 1) {
      // Next story of same user
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else if (currentUserIndex < users.length - 1) {
      // Next user, first story
      setCurrentUserIndex(currentUserIndex + 1);
      setCurrentStoryIndex(0);
    } else {
      // End of all stories
      closeStory();
      onComplete?.();
    }
  }, [currentStoryIndex, currentUser.stories.length, currentUserIndex, users.length, onComplete]);

  const previousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      // Previous story of same user
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else if (currentUserIndex > 0) {
      // Previous user, last story
      setCurrentUserIndex(currentUserIndex - 1);
      setCurrentStoryIndex(users[currentUserIndex - 1].stories.length - 1);
    }
  }, [currentStoryIndex, currentUserIndex, users]);

  const openStory = useCallback((userIndex: number, storyIndex: number) => {
    setCurrentUserIndex(userIndex);
    setCurrentStoryIndex(storyIndex);
    setIsVisible(true);
    setIsPlaying(true);
    setProgress(0);
  }, []);

  const closeStory = useCallback(() => {
    setIsVisible(false);
    setIsPlaying(false);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  const markStoryAsViewed = useCallback(() => {
    if (currentStory) {
      currentStory.viewed = true;
    }
  }, [currentStory]);

  // Mark story as viewed when it starts
  useEffect(() => {
    if (isVisible && currentStory) {
      markStoryAsViewed();
    }
  }, [currentStoryIndex, markStoryAsViewed, isVisible, currentStory]);

  return {
    // State
    currentUserIndex,
    currentStoryIndex,
    isPlaying,
    isMuted,
    progress,
    isVisible,
    currentUser,
    currentStory,
    
    // Actions
    openStory,
    closeStory,
    nextStory,
    previousStory,
    togglePlay,
    toggleMute,
    setCurrentUserIndex,
    setCurrentStoryIndex,
  };
}; 