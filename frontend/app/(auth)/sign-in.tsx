import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadows } from '../../src/theme/colors';
import { useAuthStore } from '../../src/store/authStore';

export default function SignIn() {
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password.');
      return;
    }
    setError('');
    setLoading(true);
    await signIn(email.trim(), password);
    setLoading(false);
    router.replace('/(main)/ai');
  };

  return (
    <LinearGradient colors={colors.waterGradient} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scroll}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.logoWrap} testID="auth-logo">
                <View style={styles.logoCircle}>
                  <Ionicons name="water" size={40} color={colors.primary} />
                </View>
                <Text style={styles.brand}>AquaNexus</Text>
                <Text style={styles.tagline}>Your aquarium, intelligently monitored</Text>
              </View>

              <View style={styles.card} testID="signin-card">
                <Text style={styles.title}>Welcome back</Text>
                <Text style={styles.subtitle}>Sign in to your aquarium</Text>

                <TextInput
                  testID="email-input"
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  mode="outlined"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  left={<TextInput.Icon icon="email-outline" />}
                />
                <TextInput
                  testID="password-input"
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  mode="outlined"
                  secureTextEntry
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  left={<TextInput.Icon icon="lock-outline" />}
                />

                {error ? (
                  <Text testID="auth-error" style={styles.error}>
                    {error}
                  </Text>
                ) : null}

                <Button
                  testID="signin-button"
                  mode="contained"
                  onPress={onSubmit}
                  loading={loading}
                  contentStyle={styles.btnContent}
                  style={styles.primaryBtn}
                  labelStyle={styles.btnLabel}
                >
                  Sign In
                </Button>

                <View style={styles.footerRow}>
                  <Text style={styles.muted}>Don&apos;t have an account?</Text>
                  <Link href="/(auth)/sign-up" asChild>
                    <Text testID="goto-signup-link" style={styles.link}>
                      {'  '}Sign Up
                    </Text>
                  </Link>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, padding: spacing.lg, justifyContent: 'center' },
  logoWrap: { alignItems: 'center', marginBottom: spacing.xl },
  logoCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.glass,
    marginBottom: spacing.md,
  },
  brand: { fontSize: 32, fontWeight: '800', color: colors.textPrimary, letterSpacing: 0.5 },
  tagline: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  card: {
    backgroundColor: colors.surfaceGlass,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.glass,
  },
  title: { fontSize: 24, fontWeight: '700', color: colors.textPrimary },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4, marginBottom: spacing.md },
  input: { marginTop: spacing.sm, backgroundColor: colors.surface },
  inputOutline: { borderRadius: radius.md, borderColor: colors.border },
  error: { color: colors.error, marginTop: spacing.sm, fontSize: 13 },
  primaryBtn: { marginTop: spacing.md, borderRadius: radius.full, backgroundColor: colors.primary },
  btnContent: { paddingVertical: 6 },
  btnLabel: { fontWeight: '700', fontSize: 16 },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.md },
  muted: { color: colors.textSecondary, fontSize: 14 },
  link: { color: colors.primary, fontSize: 14, fontWeight: '700' },
});
