import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, spacing, shadows } from '../../src/theme/colors';
import { useAuthStore } from '../../src/store/authStore';

const items = [
  { route: 'ai', label: 'AI Interface', icon: 'sparkles-outline' as const, testID: 'drawer-ai' },
  { route: 'dashboard', label: 'Dashboard', icon: 'speedometer-outline' as const, testID: 'drawer-dashboard' },
  { route: 'camera', label: 'Camera', icon: 'camera-outline' as const, testID: 'drawer-camera' },
  { route: 'products', label: 'Products', icon: 'bag-handle-outline' as const, testID: 'drawer-products' },
];

function CustomDrawer(props: DrawerContentComponentProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const activeRoute = props.state.routeNames[props.state.index];

  const onSignOut = () => {
    signOut();
    router.replace('/(auth)/sign-in');
  };

  return (
    <LinearGradient colors={colors.drawerGradient} style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="water" size={26} color={colors.primary} />
          </View>
          <Text style={styles.brand}>AquaNexus</Text>
          <Text style={styles.user} testID="drawer-username">
            {user?.name ? `Hi, ${user.name}` : 'Welcome'}
          </Text>
        </View>

        <View style={styles.itemsWrap}>
          {items.map((item) => {
            const isActive = activeRoute === item.route;
            return (
              <TouchableOpacity
                key={item.route}
                testID={item.testID}
                onPress={() => props.navigation.navigate(item.route as never)}
                style={[styles.item, isActive && styles.itemActive]}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={isActive ? colors.primary : colors.textSecondary}
                />
                <Text style={[styles.itemText, isActive && styles.itemTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>

      <TouchableOpacity testID="signout-button" style={styles.signout} onPress={onSignOut}>
        <Ionicons name="log-out-outline" size={20} color={colors.error} />
        <Text style={styles.signoutText}>Sign out</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default function MainLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 280, backgroundColor: 'transparent' },
        drawerType: 'front',
        overlayColor: 'rgba(45, 55, 72, 0.4)',
      }}
    >
      <Drawer.Screen name="ai" options={{ title: 'AI Interface' }} />
      <Drawer.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      <Drawer.Screen name="camera" options={{ title: 'Camera' }} />
      <Drawer.Screen name="products" options={{ title: 'Products' }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.xl + 8,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    ...shadows.glass,
  },
  brand: { fontSize: 22, fontWeight: '800', color: colors.textPrimary },
  user: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  itemsWrap: { paddingHorizontal: spacing.md, paddingTop: spacing.md, gap: 6 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
  },
  itemActive: {
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  itemText: { fontSize: 15, color: colors.textSecondary, fontWeight: '500' },
  itemTextActive: { color: colors.primary, fontWeight: '700' },
  signout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  signoutText: { color: colors.error, fontSize: 15, fontWeight: '600' },
});
