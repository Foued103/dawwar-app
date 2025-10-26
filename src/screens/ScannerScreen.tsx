import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';
import { withAlpha } from '../utils/color';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import ScanResultModal from '../components/ScanResultModal';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [flashMode, setFlashMode] = useState<'off' | 'on'>('off');
  const [showResult, setShowResult] = useState(false);
  const [scanResult, setScanResult] = useState<{
    material: string;
    co2Saved: string;
    reward: number;
  } | null>(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const handleCapture = () => {
    // TODO: Implement AI scanning with Gemini
    // For now, show a demo result
    setScanResult({
      material: 'Plastic bottles',
      co2Saved: '6g',
      reward: 3,
    });
    setShowResult(true);
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setScanResult(null);
  };

  const toggleFlash = () => {
    setFlashMode(flashMode === 'off' ? 'on' : 'off');
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Ionicons name="camera-outline" size={64} color={colors.textSecondary} />
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            Dawwar needs camera access to scan recyclable items
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isCameraActive ? (
        <CameraView
          style={styles.camera}
          facing="back"
          enableTorch={flashMode === 'on'}
        >
          {/* Minimal centered title */}
          <View style={styles.headerCompact}>
            <Text style={styles.headerTitleCompact}>Scan Recyclables</Text>
          </View>

          {/* Scanning frame overlay */}
          <View style={styles.scannerOverlay}>
            <View style={styles.scannerFrame}>
              <View style={[styles.corner, styles.cornerTopLeft]} />
              <View style={[styles.corner, styles.cornerTopRight]} />
              <View style={[styles.corner, styles.cornerBottomLeft]} />
              <View style={[styles.corner, styles.cornerBottomRight]} />
            </View>
          </View>

          {/* Bottom controls (glassy bar) */}
          <BlurView intensity={40} tint="dark" style={styles.controls}>
            {/* Flash toggle */}
            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleFlash}
            >
              <Ionicons
                name={flashMode === 'on' ? 'flash' : 'flash-off'}
                size={28}
                color={colors.textWhite}
              />
            </TouchableOpacity>

            {/* Capture button */}
            <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
              <LinearGradient
                colors={[colors.textWhite, colors.textWhite]}
                style={styles.captureButtonInner}
              >
                <Ionicons name="scan" size={36} color={colors.primary} />
              </LinearGradient>
            </TouchableOpacity>

            {/* Gallery button (placeholder) */}
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => Alert.alert('Gallery', 'Gallery feature coming soon')}
            >
              <Ionicons name="images-outline" size={28} color={colors.textWhite} />
            </TouchableOpacity>
          </BlurView>
        </CameraView>
      ) : (
        <View style={styles.container}>
          <Text style={styles.message}>Camera is not active</Text>
        </View>
      )}
      
      {/* Scan Result Modal */}
      <ScanResultModal
        visible={showResult}
        onClose={handleCloseResult}
        result={scanResult}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  permissionContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  permissionTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  permissionText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: typography.fontSize.md * typography.lineHeight.relaxed,
  },
  permissionButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: colors.textWhite,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  headerCompact: {
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    alignItems: 'center',
    paddingBottom: spacing.md,
  },
  headerTitleCompact: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textWhite,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    opacity: 0.9,
  },
  scannerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: 300,
    height: 300,
    position: 'relative',
    borderRadius: 20,
    backgroundColor: withAlpha(colors.background, 0.05),
    borderWidth: 1,
    borderColor: withAlpha(colors.text, 0.08),
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: colors.scannerFrame,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? 40 : spacing.xl,
    paddingTop: spacing.lg,
    backgroundColor: withAlpha(colors.background, 0.08),
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: withAlpha(colors.background, 0.2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  captureButtonInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.primary,
  },
});
