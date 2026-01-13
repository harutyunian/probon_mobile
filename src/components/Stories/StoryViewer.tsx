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
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import Feather from 'react-native-vector-icons/Feather';
import {Image} from 'expo-image';
import {LinearGradient} from 'expo-linear-gradient';
import {useTheme} from 'react-native-paper';

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
}: {
  user: StoryUser;
  stories: StoryMedia[];
  progress: number;
  currentStoryIndex: number;
  isPlaying: boolean;
  onClose: () => void;
  onTogglePlay: () => void;
  topInset: number;
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
        <Pressable onPress={onTogglePlay} hitSlop={8} style={styles.iconButton}>
          <Feather name={isPlaying ? 'pause' : 'play'} size={18} color="#fff" />
        </Pressable>
        <Pressable onPress={onClose} hitSlop={8} style={styles.iconButton}>
          <Feather name="x" size={18} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

export default function StoryViewer({users, controller, onStoryViewed}: Props) {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const pagerRef = useRef<PagerView>(null);
  const storyListRefs = useRef<Record<string, FlatList<StoryMedia> | null>>({});

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

  // Keep pager in sync when progressing automatically
  useEffect(() => {
    if (!isVisible) {
      return;
    }

    pagerRef.current?.setPage(currentUserIndex);
  }, [currentUserIndex, isVisible]);

  // Scroll stories to the active index when state changes programmatically
  useEffect(() => {
    if (!isVisible || !currentUser) {
      return;
    }

    const ref = storyListRefs.current[currentUser.id];
    if (ref) {
      try {
        ref.scrollToIndex({index: currentStoryIndex, animated: false});
      } catch {
        // ignore scroll failures for short lists
      }
    }
  }, [currentStoryIndex, currentUser, isVisible]);

  // Notify parent when a story becomes active
  useEffect(() => {
    if (isVisible && currentUser && currentStory) {
      onStoryViewed?.(currentUser, currentStory);
    }
  }, [currentStory, currentUser, isVisible, onStoryViewed]);

  const handlePageSelected = useCallback(
    (event: NativeSyntheticEvent<{position: number}>) => {
      const nextIndex = event.nativeEvent.position;
      setCurrentUserIndex(nextIndex);
      setCurrentStoryIndex(0);
    },
    [setCurrentStoryIndex, setCurrentUserIndex],
  );

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
      onRequestClose={closeStory}
      statusBarTranslucent
    >
      <StatusBar barStyle="light-content" hidden />
      <View style={styles.backdrop}>
        <PagerView
          ref={pagerRef}
          style={styles.pager}
          initialPage={currentUserIndex}
          onPageSelected={handlePageSelected}
        >
          {users.map((user, userIndex) => (
            <View key={user.id} style={styles.page}>
              <FlatList
                ref={ref => {
                  storyListRefs.current[user.id] = ref;
                }}
                data={user.stories}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <StorySlide
                    story={item}
                    width={width}
                    height={height}
                    onNext={nextStory}
                    onPrevious={previousStory}
                    bottomInset={insets.bottom}
                  />
                )}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={event => handleStoryMomentumEnd(userIndex, event)}
                scrollEnabled={userIndex === currentUserIndex}
                getItemLayout={(_, index) => ({
                  length: width,
                  offset: width * index,
                  index,
                })}
              />
            </View>
          ))}
        </PagerView>

        <StoryHud
          user={currentUser}
          stories={currentUser.stories}
          progress={progress}
          currentStoryIndex={currentStoryIndex}
          isPlaying={isPlaying}
          onClose={closeStory}
          onTogglePlay={togglePlay}
          topInset={insets.top}
        />
      </View>
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
