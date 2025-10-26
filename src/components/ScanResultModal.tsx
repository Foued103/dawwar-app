import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';
import { withAlpha } from '../utils/color';
import { useRecycleBin } from '../context/RecycleBinContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ScanResult {
  material: string;
  co2Saved: string;
  reward: number;
}

interface ScanResultModalProps {
  visible: boolean;
  onClose: () => void;
  result?: ScanResult | null;
}

export default function ScanResultModal({ visible, onClose, result }: ScanResultModalProps) {
  const { addItem } = useRecycleBin();

  if (!result) return null;

  const handleAddToBag = () => {
    // Parse the material name to determine category and icon
    const materialLower = result.material.toLowerCase();
    let category = 'Other';
    let icon = 'cube-outline';
    let color = colors.textSecondary;

    if (materialLower.includes('plastic') || materialLower.includes('bottle')) {
      category = 'Plastic';
      icon = 'water-outline';
      color = colors.info;
    } else if (materialLower.includes('glass') || materialLower.includes('jar')) {
      category = 'Glass';
      icon = 'wine-outline';
      color = colors.success;
    } else if (materialLower.includes('metal') || materialLower.includes('aluminum') || materialLower.includes('can')) {
      category = 'Metal';
      icon = 'flash-outline';
      color = colors.textSecondary;
    } else if (materialLower.includes('paper') || materialLower.includes('cardboard')) {
      category = 'Paper';
      icon = 'document-outline';
      color = colors.warning;
    }

    // Add item to recycle bin
    addItem({
      name: result.material,
      category,
      weight: '0.5 kg', // Default weight, can be enhanced later
      co2Saved: result.co2Saved,
      reward: result.reward,
      icon,
      color,
    });

    // Show success message
    Alert.alert(
      'Added to Bag!',
      `${result.material} has been added to your recycle bag.`,
      [
        {
          text: 'OK',
          onPress: onClose,
        },
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <View style={styles.modalContainer}>
          {/* Result Card */}
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={styles.successIcon}>
                <Ionicons name="checkmark-circle" size={48} color={colors.success} />
              </View>
            </View>
            
            <Text style={styles.materialTitle}>{result.material}</Text>

            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Saved CO₂</Text>
                <Text style={styles.statValue}>{result.co2Saved}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Material</Text>
                <Text style={styles.statValue}>{result.material.split(' ')[0]}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Reward</Text>
                <Text style={styles.statValue}>{result.reward}</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.dismissButton} onPress={onClose}>
                <Text style={styles.dismissButtonText}>Close</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.addButton} onPress={handleAddToBag}>
                <Ionicons name="add-circle" size={20} color={colors.textWhite} />
                <Text style={styles.addButtonText}>Add to Bag</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: spacing.lg,
  },
  resultCard: {
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  resultHeader: {
    marginBottom: spacing.md,
  },
  successIcon: {
    alignItems: 'center',
  },
  materialTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.xl,
  },
  statItem: {
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.border,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: spacing.sm,
  },
  dismissButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  dismissButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
  },
  addButton: {
    flex: 1.5,
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    marginLeft: spacing.xs,
  },
});
