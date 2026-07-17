import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/shared/theme/colors';

import { Slide as SlideData, SLIDES } from './slides';

export function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<Animated.ScrollView>(null);
  const scrollX = useSharedValue(0);
  const [index, setIndex] = useState(0);
  const isLast = index === SLIDES.length - 1;

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  const onIndexChange = (next: number) => {
    setIndex(next);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // index actualizado a mitad del swipe (no al soltar) para que el boton y
  // "Omitir" reaccionen mientras el dedo aun se mueve
  useAnimatedReaction(
    () => Math.round(scrollX.value / width),
    (next, prev) => {
      if (prev !== null && next !== prev && next >= 0 && next < SLIDES.length) {
        runOnJS(onIndexChange)(next);
      }
    },
  );

  const goToSlide = (i: number) => {
    scrollRef.current?.scrollTo({ x: i * width, animated: true });
  };

  const finish = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.replace('/(tabs)');
  };

  const skipStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollX.value,
      [(SLIDES.length - 2) * width, (SLIDES.length - 1) * width],
      [1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <View className="flex-1 bg-cream">
      <View style={{ paddingTop: insets.top }} className="flex-row justify-end px-6 pb-2">
        <Animated.View style={skipStyle}>
          <TouchableOpacity onPress={finish} hitSlop={12} disabled={isLast}>
            <Text className="text-[15px] font-bold text-muted">Omitir</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        className="flex-1">
        {SLIDES.map((slide, i) => (
          <Slide key={slide.title} slide={slide} i={i} width={width} scrollX={scrollX} />
        ))}
      </Animated.ScrollView>

      <View className="flex-row justify-center gap-2 pb-2">
        {SLIDES.map((slide, i) => (
          <TouchableOpacity key={slide.title} onPress={() => goToSlide(i)} hitSlop={8}>
            <Dot i={i} width={width} scrollX={scrollX} />
          </TouchableOpacity>
        ))}
      </View>

      <View className="px-6 pt-4" style={{ paddingBottom: Math.max(insets.bottom, 20) }}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={isLast ? finish : () => goToSlide(index + 1)}
          className="h-14 items-center justify-center rounded-2xl bg-violet"
          style={{ shadowColor: colors.violet, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.32, shadowRadius: 20, elevation: 4 }}>
          <Text className="text-[16.5px] font-extrabold text-white">{isLast ? 'Comenzar' : 'Siguiente'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Slide({
  slide,
  i,
  width,
  scrollX,
}: {
  slide: SlideData;
  i: number;
  width: number;
  scrollX: SharedValue<number>;
}) {
  const input = [(i - 1) * width, i * width, (i + 1) * width];

  const iconStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollX.value, input, [0.25, 1, 0.25], Extrapolation.CLAMP),
    transform: [
      { scale: interpolate(scrollX.value, input, [0.6, 1, 0.6], Extrapolation.CLAMP) },
      { translateX: interpolate(scrollX.value, input, [width * 0.12, 0, -width * 0.12], Extrapolation.CLAMP) },
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollX.value, input, [0, 1, 0], Extrapolation.CLAMP),
    transform: [
      { translateX: interpolate(scrollX.value, input, [width * 0.3, 0, -width * 0.3], Extrapolation.CLAMP) },
    ],
  }));

  return (
    <View style={{ width }} className="flex-1 items-center justify-center px-10">
      <Animated.View
        style={[{ backgroundColor: slide.iconBg }, iconStyle]}
        className="h-32 w-32 items-center justify-center rounded-[40px]">
        <Ionicons name={slide.icon} size={52} color={slide.iconColor} />
      </Animated.View>

      <Animated.View style={textStyle} className="items-center">
        <Text className="mt-8 text-[13px] font-extrabold tracking-widest text-faint">{slide.eyebrow}</Text>
        <Text className="mt-2 text-center text-[32px] font-extrabold leading-[40px] tracking-tight text-ink">
          {slide.title}
        </Text>
        <Text className="mt-4 text-center text-[15px] font-semibold leading-6 text-muted">{slide.body}</Text>
      </Animated.View>
    </View>
  );
}

function Dot({ i, width, scrollX }: { i: number; width: number; scrollX: SharedValue<number> }) {
  const style = useAnimatedStyle(() => {
    const input = [(i - 1) * width, i * width, (i + 1) * width];
    return {
      width: interpolate(scrollX.value, input, [8, 22, 8], Extrapolation.CLAMP),
      backgroundColor: interpolateColor(scrollX.value, input, [colors.border, colors.violet, colors.border]),
    };
  });

  return <Animated.View className="h-2 rounded-full" style={style} />;
}
