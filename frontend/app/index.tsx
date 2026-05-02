import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../src/store/authStore';
import { colors } from '../src/theme/colors';

export default function Index() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    const t = setTimeout(() => {
      if (isAuthenticated) router.replace('/(main)/ai');
      else router.replace('/(auth)/sign-in');
    }, 50);
    return () => clearTimeout(t);
  }, [isAuthenticated, router]);

  return (
    <View style={styles.container} testID="splash-screen">
      <ActivityIndicator color={colors.primary} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceMint,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
