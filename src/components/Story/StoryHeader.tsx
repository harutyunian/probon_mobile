import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../../types/story';

interface Props {
  user: User;
  onClose: () => void;
  topOffset?: number;
}

export default function StoryHeader({ user, onClose, topOffset = 58 }: Props) {
  return (
    <View style={[styles.container, { top: topOffset }]}>
      <View style={styles.userRow}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} contentFit="cover" />
        <Text style={styles.userName}>{user.name}</Text>
      </View>
      <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
        <Ionicons name="close" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 20,
  },
  userRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userName: { color: '#fff', fontSize: 17, fontWeight: '700' },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 