import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  FlatList,
  Text,
  StatusBar,
  useWindowDimensions,
  Animated,
  Easing,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image} from 'expo-image';
import {LinearGradient} from 'expo-linear-gradient';
import {useTheme, IconButton} from 'react-native-paper';

import {StoryMedia, StoryUser} from '../../types/story';
import {StoryStateController} from '../../hooks/useStoryState';

type Props = {
  users: StoryUser[];
  controller: StoryStateController;
  onStoryViewed?: (user: StoryUser, story: StoryMedia) => void;
};

const formatTimeAgo = (input?: string | Date) => {
  if (!input) {
    return '';
  }

  const date = typeof input === 'string' ? new Date(input) : input;
  const diffMs = Date.now() - date.getTime();
  const diffSeconds = Math.max(0, Math.floor(diffMs / 1000));

  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  const minutes = Math.floor(diffSeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const StorySlide = ({
  story,
  width,
  height,
  onNext,
  onPrevious,
  bottomInset,
}: {
  story: StoryMedia;
  width: number;
  height: number;
  onNext: () => void;
  onPrevious: () => void;
  bottomInset: number;
}) => {
  const overlayContent = useMemo(
    () => (typeof story.overlay === 'function' ? story.overlay() : story.overlay),
    [story],
  );

  return (
    <View style={[styles.slide, {width, height}]}>
      <Image source={{uri: story.uri}} style={StyleSheet.absoluteFillObject} contentFit="cover" />
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(0,0,0,0.55)', 'rgba(0,0,0,0.05)', 'transparent']}
        style={styles.topGradient}
      />
      <LinearGradient
        pointerEvents="none"
        colors={['transparent', 'rgba(0,0,0,0.25)', 'rgba(0,0,0,0.6)']}
        style={styles.bottomGradient}
      />
      <View style={styles.tapRow} pointerEvents="box-none">
        <Pressable style={styles.tapZone} onPress={onPrevious} />
        <Pressable style={styles.tapZone} onPress={onNext} />
      </View>
      {overlayContent ? (
        <View style={[styles.overlay, {paddingBottom: 28 + bottomInset}]}>{overlayContent}</View>
      ) : null}
    </View>
  );
};

const StoryHud = ({
  user,
  stories,
  progress,
  currentStoryIndex,
  isPlaying,
  onClose,
  onTogglePlay,
  topInset,
  isClosing,
}: {
  user: StoryUser;
  stories: StoryMedia[];
  progress: number;
  currentStoryIndex: number;
  isPlaying: boolean;
  onClose: () => void;
  onTogglePlay: () => void;
  topInset: number;
  isClosing: boolean;
}) => {
  const {colors} = useTheme();
  const accent = colors.primary;

  return (
    <View style={[styles.hudContainer, {paddingTop: topInset + 8}]}>
      <View style={styles.progressRow}>
        {stories.map((story, index) => {
          const isActive = index === currentStoryIndex;
          const isViewed = index < currentStoryIndex;
          const width = isViewed ? '100%' : isActive ? `${Math.min(progress, 1) * 100}%` : '0%';

          return (
            <View key={story.id} style={styles.progressTrack}>
              <View style={[styles.progressFill, {width, backgroundColor: accent}]} />
            </View>
          );
        })}
      </View>
      <View style={styles.hudHeader}>
        <Image source={{uri: user.avatarUri}} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {user.name}
          </Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            {formatTimeAgo(stories[currentStoryIndex]?.postedAt)}
          </Text>
        </View>
        <IconButton
          icon={({size, color}) =>
            isPlaying ? (
              <MaterialCommunityIcons name="pause" size={size} color={color} />
            ) : (
              <Entypo name="controller-play" size={size} color={color} />
            )
          }
          size={18}
          iconColor="#fff"
          onPress={onTogglePlay}
          style={styles.iconButton}
          disabled={isClosing}
        />
        <IconButton
          icon={({size, color}) => (
            <MaterialCommunityIcons name="close" size={size} color={color} />
          )}
          size={18}
          iconColor="#fff"
          onPress={onClose}
          style={styles.iconButton}
          disabled={isClosing}
        />
      </View>
    </View>
  );
};

export default function StoryViewer({users, controller, onStoryViewed}: Props) {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const pagerRef = useRef<FlatList<StoryUser> | null>(null);
  const storyListRefs = useRef<Record<string, ScrollView | null>>({});
  const animatedValue = useRef(new Animated.Value(0)).current;
  const isClosingRef = useRef(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const dragY = useRef(new Animated.Value(0)).current;

  const {
    isVisible,
    closeStory,
    currentUserIndex,
    currentStoryIndex,
    progress,
    isPlaying,
    togglePlay,
    nextStory,
    previousStory,
    setCurrentStoryIndex,
    setCurrentUserIndex,
    currentUser,
    currentStory,
  } = controller;

  // Animate in when the viewer becomes visible
  useEffect(() => {
    if (isVisible) {
      isClosingRef.current = false;
      animatedValue.setValue(0);
      dragY.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      animatedValue.setValue(0);
      dragY.setValue(0);
    }
  }, [animatedValue, dragY, isVisible]);

  const handleAnimatedClose = useCallback(() => {
    if (isClosingRef.current || !isVisible) {
      return;
    }
    isClosingRef.current = true;
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        closeStory();
      } else {
        isClosingRef.current = false;
      }
    });
  }, [animatedValue, closeStory, isVisible]);

  const handleRelease = useCallback(
    (dy: number) => {
      if (dy > 120) {
        isClosingRef.current = true;
        Animated.parallel([
          Animated.timing(dragY, {
            toValue: height,
            duration: 180,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 180,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start(() => closeStory());
      } else {
        Animated.spring(dragY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 8,
        }).start();
      }
    },
    [animatedValue, closeStory, dragY, height],
  );

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (_evt, gestureState) => {
        dragY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_evt, gestureState) => handleRelease(gestureState.dy),
      onPanResponderTerminate: (_evt, gestureState) => handleRelease(gestureState.dy),
    }),
  ).current;

  // Scroll stories to the active index when state changes programmatically
  useEffect(() => {
    if (!isVisible || !currentUser) {
      return;
    }

    const ref = storyListRefs.current[currentUser.id];
    if (ref) {
      ref.scrollTo({x: width * currentStoryIndex, animated: false});
    }
  }, [currentStoryIndex, currentUser, isVisible, width]);

  // Notify parent when a story becomes active
  useEffect(() => {
    if (isVisible && currentUser && currentStory) {
      onStoryViewed?.(currentUser, currentStory);
    }
  }, [currentStory, currentUser, isVisible, onStoryViewed]);

  const handleUserMomentumEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
      if (Number.isFinite(nextIndex)) {
        setCurrentUserIndex(nextIndex);
        setCurrentStoryIndex(0);
      }
    },
    [setCurrentStoryIndex, setCurrentUserIndex, width],
  );

  // Keep outer pager aligned when state changes programmatically (auto-advance)
  useEffect(() => {
    if (!isVisible) {
      return;
    }
    pagerRef.current?.scrollToOffset({
      offset: width * currentUserIndex,
      animated: true,
    });
  }, [currentUserIndex, isVisible, width]);

  const handleStoryMomentumEnd = useCallback(
    (userIndex: number, event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (userIndex !== currentUserIndex) {
        return;
      }
      const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
      if (Number.isFinite(nextIndex)) {
        setCurrentStoryIndex(nextIndex);
      }
    },
    [currentUserIndex, setCurrentStoryIndex, width],
  );

  if (!currentUser) {
    return null;
  }

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      onRequestClose={handleAnimatedClose}
      transparent
      presentationStyle="overFullScreen"
      statusBarTranslucent
    >
      <StatusBar barStyle="light-content" hidden />
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.backdrop,
          {
            opacity: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.15, 1],
            }),
            transform: [
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1],
                }),
              },
              {translateY: dragY},
            ],
          },
        ]}
      >
        <Animated.FlatList
          ref={pagerRef}
          data={users}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleUserMomentumEnd}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          initialScrollIndex={currentUserIndex}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          renderItem={({item, index: userIndex}) => {
            const inputRange = [(userIndex - 1) * width, userIndex * width, (userIndex + 1) * width];
            const rotateY = scrollX.interpolate({
              inputRange,
              outputRange: ['15deg', '0deg', '-15deg'],
              extrapolate: 'clamp',
            });
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.9, 1, 0.9],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                style={[
                  styles.page,
                  {
                    width,
                    transform: [{perspective: 900}, {rotateY}, {scale}],
                  },
                ]}
              >
                <ScrollView
                  ref={ref => {
                    storyListRefs.current[item.id] = ref;
                  }}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  scrollEnabled={userIndex === currentUserIndex}
                  onMomentumScrollEnd={event => handleStoryMomentumEnd(userIndex, event)}
                  contentContainerStyle={{width: width * item.stories.length}}
                >
                  {item.stories.map(story => (
                    <StorySlide
                      key={story.id}
                      story={story}
                      width={width}
                      height={height}
                      onNext={nextStory}
                      onPrevious={previousStory}
                      bottomInset={insets.bottom}
                    />
                  ))}
                </ScrollView>
              </Animated.View>
            );
          }}
        />

        <StoryHud
          user={currentUser}
          stories={currentUser.stories}
          progress={progress}
          currentStoryIndex={currentStoryIndex}
          isPlaying={isPlaying}
          onClose={handleAnimatedClose}
          onTogglePlay={togglePlay}
          topInset={insets.top}
          isClosing={isClosingRef.current}
        />
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: '#000',
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  slide: {
    flex: 1,
    backgroundColor: '#111',
  },
  tapRow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  tapZone: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 32,
    paddingHorizontal: 12,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 220,
  },
  bottomGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 240,
  },
  hudContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    rowGap: 12,
    pointerEvents: 'box-none',
  },
  progressRow: {
    flexDirection: 'row',
    columnGap: 6,
    paddingHorizontal: 2,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
  },
  hudHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  headerText: {
    flex: 1,
    rowGap: 2,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  iconButton: {
    padding: 6,
  },
});
