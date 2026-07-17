import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { Avatar } from './Avatar';

const FACE = 22;
const FACE_OVERLAP = 7;

// Firma visual de Bowe: los testigos "caminan" sobre la barra siguiendo tu
// progreso. Sin faces es una barra animada normal.
export function ProgressBar({
  pct,
  color,
  height = 11,
  faces = [],
}: {
  pct: number;
  color: string;
  height?: number;
  faces?: string[];
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(150, withTiming(pct, { duration: 700, easing: Easing.out(Easing.cubic) }));
  }, [pct, progress]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));
  const facesStyle = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));

  const clusterWidth = FACE + (faces.length - 1) * (FACE - FACE_OVERLAP);

  return (
    <View style={{ paddingTop: faces.length ? FACE - 4 : 0 }}>
      <View className="overflow-hidden bg-border" style={{ height, borderRadius: height / 2 }}>
        <Animated.View style={[{ height: '100%', borderRadius: height / 2, backgroundColor: color }, fillStyle]} />
      </View>
      {faces.length > 0 && (
        <Animated.View
          className="absolute left-0 top-0 flex-row justify-end"
          style={[{ minWidth: clusterWidth, transform: [{ translateX: FACE / 2 }] }, facesStyle]}>
          {faces.map((name, i) => (
            <View key={name} style={{ marginLeft: i === 0 ? 0 : -FACE_OVERLAP }}>
              <Avatar name={name} size={FACE} borderColor="#fff" />
            </View>
          ))}
        </Animated.View>
      )}
    </View>
  );
}
