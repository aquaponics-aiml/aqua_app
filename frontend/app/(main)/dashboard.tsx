import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadows } from '../../src/theme/colors';
import { sensorData, trends } from '../../src/data/mockData';
import GlassCard from '../../src/components/GlassCard';
import ScreenHeader from '../../src/components/ScreenHeader';
import { useAuthStore } from '../../src/store/authStore';

type CardProps = {
  testID: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  label: string;
  value: string;
  unit: string;
  status: string;
  statusColor: string;
  trend: number[];
};

function MetricCard({ testID, icon, iconColor, iconBg, label, value, unit, status, statusColor, trend }: CardProps) {
  const max = Math.max(...trend);
  const min = Math.min(...trend);
  return (
    <GlassCard style={styles.card} testID={testID}>
      <View style={styles.cardTop}>
        <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
          <Ionicons name={icon} size={22} color={iconColor} />
        </View>
        <View style={[styles.statusPill, { backgroundColor: statusColor + '20' }]}>
          <View style={[styles.dot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
        </View>
      </View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>

      {/* Mini sparkline graph placeholder */}
      <View style={styles.sparkline}>
        {trend.map((v, i) => {
          const heightPct = max === min ? 0.5 : (v - min) / (max - min);
          return (
            <View
              key={i}
              style={[
                styles.bar,
                {
                  height: 6 + heightPct * 28,
                  backgroundColor: iconColor,
                  opacity: 0.35 + heightPct * 0.65,
                },
              ]}
            />
          );
        })}
      </View>
    </GlassCard>
  );
}

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);

  return (
    <LinearGradient colors={colors.waterGradient} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScreenHeader
          title={`Hello, ${user?.name || 'Aquarist'}`}
          subtitle="Your tank at a glance"
          testID="dashboard-header"
        />
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          testID="dashboard-scroll"
        >
          <MetricCard
            testID="temperature-card"
            icon="thermometer-outline"
            iconColor="#ED8936"
            iconBg="#FFF4E6"
            label="Temperature"
            value={`${sensorData.temperature.value}`}
            unit={sensorData.temperature.unit}
            status="Optimal"
            statusColor={colors.success}
            trend={trends.temperature}
          />
          <MetricCard
            testID="ph-card"
            icon="water-outline"
            iconColor={colors.accent}
            iconBg="#EBF8FF"
            label="pH Level"
            value={`${sensorData.ph.value}`}
            unit={sensorData.ph.unit}
            status="Balanced"
            statusColor={colors.success}
            trend={trends.ph}
          />
          <MetricCard
            testID="food-card"
            icon="fish-outline"
            iconColor={colors.primary}
            iconBg="#E6FFFA"
            label="Food Level"
            value={`${sensorData.food.value}`}
            unit={sensorData.food.unit}
            status="Good"
            statusColor={colors.primary}
            trend={trends.food}
          />

          <GlassCard style={styles.tipCard} testID="dashboard-tip">
            <View style={styles.tipHeader}>
              <Ionicons name="bulb-outline" size={18} color={colors.primary} />
              <Text style={styles.tipTitle}>Today&apos;s Tip</Text>
            </View>
            <Text style={styles.tipText}>
              Conditions are stable. Continue routine 20% weekly water changes to maintain
              healthy nitrate levels.
            </Text>
          </GlassCard>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl },
  card: { gap: spacing.sm },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  label: { fontSize: 13, color: colors.textSecondary, marginTop: spacing.sm, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: '600' },
  valueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, marginTop: 2 },
  value: { fontSize: 36, fontWeight: '800', color: colors.textPrimary, lineHeight: 40 },
  unit: { fontSize: 16, color: colors.textSecondary, fontWeight: '600', marginBottom: 6 },
  sparkline: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 40,
    gap: 6,
    marginTop: spacing.sm,
  },
  bar: { flex: 1, borderRadius: 3 },
  tipCard: { backgroundColor: colors.surfaceMint, borderColor: colors.border, ...shadows.card },
  tipHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  tipTitle: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  tipText: { fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
});
