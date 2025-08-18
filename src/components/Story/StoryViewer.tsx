import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Modal } from 'react-native';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { StoryViewerProps } from '../../types/story';
import StoryProgress from './StoryProgress';
import StoryHeader from './StoryHeader';
import StoryControls from './StoryControls';

const { width, height } = Dimensions.get('window');

export default function StoryViewer({ users, initialUserIndex = 0, initialStoryIndex = 0, onClose }: StoryViewerProps) {
  const [userIndex, setUserIndex] = useState(initialUserIndex);
  const [storyIndex, setStoryIndex] = useState(initialStoryIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isStopped, setIsStopped] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // baseline progress tracking for precise pause/resume
  const progressStartRef = useRef(0); // base fraction when (re)starting
  const startTsRef = useRef<number | null>(null); // timestamp at (re)start

  const currentUser = users[userIndex];
  const currentStory = currentUser?.stories[storyIndex];

  // helper to fully stop the ticking timer
  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // gesture / animation state
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const cardScale = useSharedValue(1);

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: cardScale.value },
    ],
  }));

  const doResume = () => {
    if (!isStopped) {
      progressStartRef.current = progress; // resume from frozen position
      setIsPlaying(true);
    }
  };
  const doPause = () => {
    progressStartRef.current = progress; // freeze at exact position
    clearTimer();
    setIsPlaying(false);
  };
  const closeNow = () => { setVisible(false); onClose(); };

  const completeSwipe = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      if (storyIndex < currentUser.stories.length - 1) {
        setStoryIndex(storyIndex + 1);
        translateX.value = width;
        translateX.value = withTiming(0, { duration: 220 }, () => runOnJS(doResume)());
      } else if (userIndex < users.length - 1) {
        setUserIndex(userIndex + 1);
        setStoryIndex(0);
        translateX.value = width;
        translateX.value = withTiming(0, { duration: 220 }, () => runOnJS(doResume)());
      } else {
        runOnJS(closeNow)();
      }
    } else {
      if (storyIndex > 0) {
        setStoryIndex(storyIndex - 1);
        translateX.value = -width;
        translateX.value = withTiming(0, { duration: 220 }, () => runOnJS(doResume)());
      } else if (userIndex > 0) {
        const prevUserIndex = userIndex - 1;
        setUserIndex(prevUserIndex);
        setStoryIndex(users[prevUserIndex].stories.length - 1);
        translateX.value = -width;
        translateX.value = withTiming(0, { duration: 220 }, () => runOnJS(doResume)());
      } else {
        translateX.value = withSpring(0, { damping: 18, stiffness: 180 }, () => runOnJS(doResume)());
      }
    }
  };

  // gestures
  const panX = Gesture.Pan()
    .onBegin(() => { runOnJS(doPause)(); })
    .onUpdate((e) => { translateX.value = e.translationX; })
    .onEnd((e) => {
      const shouldNext = e.translationX < -width * 0.2 || e.velocityX < -600;
      const shouldPrev = e.translationX > width * 0.2 || e.velocityX > 600;
      if (shouldNext) {
        translateX.value = withTiming(-width, { duration: 200 }, () => { runOnJS(completeSwipe)('next'); });
      } else if (shouldPrev) {
        translateX.value = withTiming(width, { duration: 200 }, () => { runOnJS(completeSwipe)('prev'); });
      } else {
        translateX.value = withSpring(0, { damping: 18, stiffness: 180 }, () => runOnJS(doResume)());
      }
    });

  const panY = Gesture.Pan()
    .onUpdate((e) => {
      if (Math.abs(e.translationY) > Math.abs(e.translationX)) {
        translateY.value = e.translationY;
        cardScale.value = 1 - Math.min(Math.abs(e.translationY) / 600, 0.15);
      }
    })
    .onEnd((e) => {
      if (e.translationY > 120 || e.velocityY > 800) {
        translateY.value = withTiming(height, { duration: 200 }, () => runOnJS(closeNow)());
      } else {
        translateY.value = withSpring(0);
        cardScale.value = withSpring(1);
      }
    });

  // Long press to pause; on release, resume without skipping
  const longPress = Gesture.LongPress()
    .minDuration(150)
    .onStart(() => { runOnJS(doPause)(); })
    .onEnd((_e, success) => { if (!isStopped) runOnJS(doResume)(); });

  // single tap => next (respect stop)
  const next = useCallback(() => {
    if (isStopped) return;
    if (storyIndex < currentUser.stories.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else {
      translateX.value = withTiming(-width, { duration: 200 }, () => { runOnJS(completeSwipe)('next'); });
    }
  }, [storyIndex, currentUser.stories.length, isStopped]);

  const tap = Gesture.Tap()
    .maxDuration(150)
    .onEnd(() => { if (!isStopped) runOnJS(next)(); });

  const composedGesture = Gesture.Simultaneous(Gesture.Race(longPress, tap), panX, panY);

  // auto progress using baseline + elapsed so pause/resume is precise
  useEffect(() => {
    if (!currentStory || !isPlaying || isStopped) return;
    startTsRef.current = Date.now();
    const base = progressStartRef.current;
    const duration = currentStory.duration;
    clearTimer();
    intervalRef.current = setInterval(() => {
      // guard if stopped mid-tick
      if (isStopped) return;
      const elapsed = Date.now() - (startTsRef.current ?? Date.now());
      const p = Math.min(base + elapsed / duration, 1);
      setProgress(p);
      if (p >= 1) {
        progressStartRef.current = 0;
        if (storyIndex < currentUser.stories.length - 1) {
          setStoryIndex(storyIndex + 1);
        } else if (userIndex < users.length - 1) {
          translateX.value = withTiming(-width, { duration: 200 }, () => { runOnJS(completeSwipe)('next'); });
        } else {
          runOnJS(closeNow)();
        }
      }
    }, 50);
    return () => { clearTimer(); };
  }, [userIndex, storyIndex, isPlaying, currentStory, isStopped]);

  // when story changes, reset progress and baseline
  useEffect(() => { setProgress(0); progressStartRef.current = 0; }, [userIndex, storyIndex]);

  const prev = useCallback(() => {
    if (isStopped) return;
    if (storyIndex > 0) {
      setStoryIndex(storyIndex - 1);
    } else {
      translateX.value = withTiming(width, { duration: 200 }, () => { runOnJS(completeSwipe)('prev'); });
    }
  }, [storyIndex, isStopped]);

  if (!currentUser || !currentStory) return null;

  return (
    <Modal visible={visible} animationType="fade" presentationStyle="fullScreen" onRequestClose={closeNow}>
      <StatusBar style="light" hidden />
      <GestureDetector gesture={composedGesture}>
        <View style={styles.container}>
          <Animated.View style={[StyleSheet.absoluteFill, animatedCardStyle]}>
            <ImageBackground source={{ uri: currentStory.imageUrl }} style={styles.background} contentFit="cover">
              <LinearGradient colors={["rgba(0,0,0,0.65)", "transparent"]} style={styles.topFade} />
              <LinearGradient colors={["transparent", "rgba(0,0,0,0.65)"]} style={styles.bottomFade} />

              <StoryProgress stories={currentUser.stories} currentStoryIndex={storyIndex} progress={progress} topOffset={36} />
              <StoryHeader user={currentUser} onClose={closeNow} topOffset={50} />

              <View style={styles.bottomPanel}>
                <Text style={styles.byText}>By {currentUser.name}</Text>
                <Text style={styles.title} numberOfLines={2}>{currentStory.title}</Text>
                <TouchableOpacity style={styles.cta} activeOpacity={0.85}>
                  <Text style={styles.ctaText}>See more</Text>
                </TouchableOpacity>
              </View>

              <StoryControls
                isStopped={isStopped}
                onToggleStop={() => {
                  const nextStopped = !isStopped;
                  if (nextStopped) {
                    // stopping: freeze and clear timer immediately to prevent auto-advance
                    progressStartRef.current = progress;
                    clearTimer();
                    setIsPlaying(false);
                  } else {
                    // resuming from exact point
                    progressStartRef.current = progress;
                    setIsPlaying(true);
                  }
                  setIsStopped(nextStopped);
                }}
                onClose={closeNow}
              />

              <TouchableOpacity style={styles.left} activeOpacity={1} onPress={prev} />
              <TouchableOpacity style={styles.right} activeOpacity={1} onPress={next} />
            </ImageBackground>
          </Animated.View>
        </View>
      </GestureDetector>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  background: { width: '100%', height: '100%' },
  topFade: { position: 'absolute', top: 0, left: 0, right: 0, height: 140 },
  bottomFade: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 220 },
  bottomPanel: { position: 'absolute', left: 16, right: 16, bottom: 60 },
  byText: { color: '#ddd', fontSize: 12, marginBottom: 8 },
  title: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 16 },
  cta: { backgroundColor: '#5B4BDB', paddingVertical: 14, borderRadius: 24, alignItems: 'center' },
  ctaText: { color: '#fff', fontWeight: '700' },
  left: { position: 'absolute', left: 0, top: 0, width: width * 0.4, height },
  right: { position: 'absolute', right: 0, top: 0, width: width * 0.4, height },
}); 