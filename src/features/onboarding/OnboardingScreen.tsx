import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/shared/theme/colors';

import { SLIDES } from './slides';

export function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);
  const isLast = index === SLIDES.length - 1;

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / width);
    if (next !== index) {
      setIndex(next);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const goToSlide = (i: number) => {
    scrollRef.current?.scrollTo({ x: i * width, animated: true });
    setIndex(i);
  };

  const finish = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-cream">
      <View style={{ paddingTop: insets.top }} className="flex-row justify-end px-6 pb-2">
        {!isLast && (
          <TouchableOpacity onPress={finish} hitSlop={12}>
            <Text className="text-[15px] font-bold text-muted">Omitir</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        className="flex-1">
        {SLIDES.map((slide, i) => (
          <View key={slide.title} style={{ width }} className="flex-1 items-center justify-center px-10">
            <View
              className="h-32 w-32 items-center justify-center rounded-[40px]"
              style={{ backgroundColor: slide.iconBg }}>
              <Ionicons name={slide.icon} size={52} color={slide.iconColor} />
            </View>

            <View className="items-center">
              <Text className="mt-8 text-[13px] font-extrabold tracking-widest text-faint">{slide.eyebrow}</Text>
              <Text className="mt-2 text-center text-[32px] font-extrabold leading-9 tracking-tight text-ink">
                {slide.title}
              </Text>
              <Text className="mt-4 text-center text-[15px] font-semibold leading-6 text-muted">{slide.body}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="flex-row justify-center gap-2 pb-2">
        {SLIDES.map((slide, i) => (
          <TouchableOpacity key={slide.title} onPress={() => goToSlide(i)} hitSlop={8}>
            <View
              className="h-2 rounded-full"
              style={{ width: i === index ? 22 : 8, backgroundColor: i === index ? colors.violet : colors.border }}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View className="px-6 pb-6 pt-4" style={{ paddingBottom: Math.max(insets.bottom, 20) }}>
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
