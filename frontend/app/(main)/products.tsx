import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadows } from '../../src/theme/colors';
import { products, Product } from '../../src/data/mockData';
import ScreenHeader from '../../src/components/ScreenHeader';

const CATEGORIES = ['All', 'Equipment', 'Sensor', 'Food', 'Decor', 'Tank'];

export default function Products() {
  const [filter, setFilter] = useState<string>('All');
  const [reorderedId, setReorderedId] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === 'All' ? products : products.filter((p) => p.category === filter)),
    [filter]
  );

  const onReorder = (id: string) => {
    setReorderedId(id);
    setTimeout(() => setReorderedId(null), 1500);
  };

  const renderItem = ({ item }: { item: Product }) => {
    const reordered = reorderedId === item.id;
    return (
      <View testID={`product-card-${item.id}`} style={styles.card}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        <View style={styles.cardBody}>
          <Text numberOfLines={2} style={styles.name}>
            {item.name}
          </Text>
          <Text style={styles.price}>{item.price}</Text>
          <TouchableOpacity
            testID={`reorder-button-${item.id}`}
            onPress={() => onReorder(item.id)}
            style={[styles.reorderBtn, reordered && styles.reorderBtnDone]}
            activeOpacity={0.85}
          >
            <Ionicons
              name={reordered ? 'checkmark' : 'refresh-outline'}
              size={14}
              color="#fff"
            />
            <Text style={styles.reorderText}>{reordered ? 'Reordered' : 'Reorder'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient colors={colors.waterGradient} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScreenHeader
          title="Products"
          subtitle="Reorder essentials in one tap"
          testID="products-header"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
          testID="category-filter"
        >
          {CATEGORIES.map((c) => {
            const active = filter === c;
            return (
              <TouchableOpacity
                key={c}
                testID={`filter-chip-${c.toLowerCase()}`}
                onPress={() => setFilter(c)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{c}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <FlatList
          testID="products-grid"
          data={visible}
          numColumns={2}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          columnWrapperStyle={{ gap: spacing.md }}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  chipsRow: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.textSecondary, fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  grid: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.card,
  },
  imageWrap: { position: 'relative' },
  image: {
    width: '100%',
    height: 130,
    backgroundColor: colors.surfaceMint,
  },
  categoryBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardBody: { padding: spacing.md, gap: 6 },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    minHeight: 38,
  },
  price: { fontSize: 15, fontWeight: '800', color: colors.primary },
  reorderBtn: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingVertical: 9,
    borderRadius: radius.full,
  },
  reorderBtnDone: { backgroundColor: colors.success },
  reorderText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
