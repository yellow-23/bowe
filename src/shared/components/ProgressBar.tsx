import { View } from 'react-native';

export function ProgressBar({ pct, color, height = 11 }: { pct: number; color: string; height?: number }) {
  return (
    <View className="overflow-hidden bg-border" style={{ height, borderRadius: height / 2 }}>
      <View
        style={{
          height: '100%',
          borderRadius: height / 2,
          width: `${Math.round(pct * 100)}%`,
          backgroundColor: color,
        }}
      />
    </View>
  );
}
