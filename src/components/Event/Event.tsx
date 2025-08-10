import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {ImageBackground} from "expo-image";
import {useMemo} from "react";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1520975922215-230f5a5d0f54?q=80&w=1964&auto=format&fit=crop";

interface EventProps {
  title: string;
  imageUrl?: string;
  hasUnviewedStories?: boolean;
  onPress?: () => void;
}

export default function Event({ title, imageUrl, hasUnviewedStories = false, onPress }: EventProps) {
  const src = imageUrl || DEFAULT_IMAGE;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <ImageBackground source={{uri: src}} style={[styles.container]} imageStyle={styles.image}>
        {hasUnviewedStories && <View style={styles.indicator} />}
        <Text style={styles.text} numberOfLines={1}>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderWidth: 1,
    width: 112,
    height: 140,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 8,
    position: 'relative',
  },
  image: { borderRadius: 16 },
  text: { color: 'white', fontWeight: '900', fontSize: 14 },
  indicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6cf',
    borderWidth: 2,
    borderColor: '#fff',
  },
})