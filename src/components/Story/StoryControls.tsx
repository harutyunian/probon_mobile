import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  isStopped: boolean;
  onToggleStop: () => void;
  onClose: () => void;
}

export default function StoryControls({ isStopped, onToggleStop, onClose }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggleStop} style={[styles.btn, isStopped ? styles.playBtn : styles.stopBtn]}>
        <Ionicons name={isStopped ? 'play' : 'pause'} size={22} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose} style={styles.btn}>
        <Ionicons name="close" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 110,
    gap: 12,
    zIndex: 20,
  },
  btn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopBtn: { backgroundColor: 'rgba(220, 53, 69, 0.7)' },
  playBtn: { backgroundColor: 'rgba(40, 167, 69, 0.7)' },
}); 