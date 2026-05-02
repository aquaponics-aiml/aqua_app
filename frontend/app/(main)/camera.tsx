import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadows } from '../../src/theme/colors';
import ScreenHeader from '../../src/components/ScreenHeader';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [captured, setCaptured] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const isWeb = Platform.OS === 'web';

  const onCapture = () => {
    setCaptured(true);
    setTimeout(() => setCaptured(false), 1200);
  };

  const renderPreview = () => {
    // Web fallback / preview – show mock aquatic gradient
    if (isWeb) {
      return (
        <LinearGradient
          colors={['#0F4C5C' as any, '#1A6B7B' as any, '#2C7A7B' as any]}
          style={styles.preview}
        >
          <Text style={styles.webNote}>Live camera preview available on device</Text>
        </LinearGradient>
      );
    }
    if (!permission) {
      return (
        <View style={[styles.preview, styles.center]}>
          <ActivityIndicator color="#fff" />
        </View>
      );
    }
    if (!permission.granted) {
      return (
        <View style={[styles.preview, styles.center, { backgroundColor: '#1A202C' }]}>
          <Ionicons name="camera-outline" size={48} color={colors.secondary} />
          <Text style={styles.permTitle}>Camera permission required</Text>
          <Text style={styles.permText}>
            We need camera access to identify fish in your tank.
          </Text>
          <TouchableOpacity
            testID="grant-camera-button"
            onPress={requestPermission}
            style={styles.permBtn}
          >
            <Text style={styles.permBtnText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return <CameraView ref={cameraRef} style={styles.preview} facing="back" />;
  };

  return (
    <LinearGradient colors={colors.waterGradient} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScreenHeader title="Fish Detection" subtitle="Point your camera at the tank" testID="camera-header" />

        <View style={styles.frame} testID="camera-frame">
          {renderPreview()}

          {/* Bounding Box Overlay */}
          <View pointerEvents="none" style={styles.boxOverlay} testID="bounding-box">
            <View style={styles.boundingBox}>
              <View style={[styles.corner, styles.tl]} />
              <View style={[styles.corner, styles.tr]} />
              <View style={[styles.corner, styles.bl]} />
              <View style={[styles.corner, styles.br]} />
            </View>
            <View style={styles.label} testID="fish-label">
              <View style={styles.labelDot} />
              <Text style={styles.labelText}>Fish Type: Goldfish</Text>
              <Text style={styles.labelConf}>92%</Text>
            </View>
          </View>

          {captured && (
            <View style={styles.flash} testID="capture-flash">
              <View style={styles.flashPill}>
                <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                <Text style={styles.flashText}>Captured</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.controls}>
          <View style={styles.sideBtn} />
          <TouchableOpacity
            testID="capture-button"
            onPress={onCapture}
            style={styles.captureBtn}
            activeOpacity={0.8}
          >
            <View style={styles.captureInner} />
          </TouchableOpacity>
          <TouchableOpacity testID="flip-camera-button" style={styles.sideBtn}>
            <Ionicons name="camera-reverse-outline" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    margin: spacing.lg,
    marginTop: spacing.sm,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.glass,
  },
  preview: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  webNote: {
    color: '#fff',
    opacity: 0.7,
    position: 'absolute',
    bottom: spacing.md,
    alignSelf: 'center',
    fontSize: 12,
    width: '100%',
    textAlign: 'center',
  },
  permTitle: { color: '#fff', fontWeight: '700', fontSize: 16, marginTop: spacing.md },
  permText: { color: '#CBD5E0', fontSize: 13, textAlign: 'center', marginTop: 6 },
  permBtn: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    borderRadius: radius.full,
  },
  permBtnText: { color: '#fff', fontWeight: '700' },
  boxOverlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  boundingBox: {
    width: '60%',
    aspectRatio: 1.2,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderStyle: 'dashed',
    borderRadius: radius.md,
  },
  corner: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderColor: colors.secondary,
  },
  tl: { top: -2, left: -2, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 6 },
  tr: { top: -2, right: -2, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 6 },
  bl: { bottom: -2, left: -2, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 6 },
  br: { bottom: -2, right: -2, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 6 },
  label: {
    position: 'absolute',
    top: '18%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(45, 55, 72, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.full,
  },
  labelDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.secondary },
  labelText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  labelConf: { color: colors.secondary, fontSize: 12, fontWeight: '700', marginLeft: 4 },
  flash: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: spacing.lg },
  flashPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radius.full,
    ...shadows.card,
  },
  flashText: { color: colors.textPrimary, fontWeight: '700' },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
  sideBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  captureBtn: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: 'rgba(56,178,172,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.primary,
  },
  captureInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#fff',
  },
});
