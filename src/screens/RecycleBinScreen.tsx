import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '../theme';
import { withAlpha } from '../utils/color';
import { useRecycleBin } from '../context/RecycleBinContext';
import type { MarketplaceStackParamList } from '../navigation/MarketplaceStackNavigator';

type RecycleBinNavigationProp = StackNavigationProp<MarketplaceStackParamList, 'RecycleBin'>;

export default function RecycleBinScreen() {
  const navigation = useNavigation<RecycleBinNavigationProp>();
  const { items, removeItem, clearAll, getTotalStats } = useRecycleBin();
  const { totalItems, totalWeight, totalCO2, totalReward } = getTotalStats();

  const handleRemoveItem = (id: string, name: string) => {
    Alert.alert(
      'Remove Item',
      `Remove ${name} from your recycle bin?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeItem(id),
        },
      ]
    );
  };

  const handleSchedulePickup = () => {
    Alert.alert(
      'Schedule Pickup',
      'Choose when you want us to collect your recyclables',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Tomorrow', onPress: () => console.log('Tomorrow') },
        { text: 'This Week', onPress: () => console.log('This Week') },
      ]
    );
  };

  const handleSellNow = () => {
    if (totalItems === 0) {
      Alert.alert('Empty Bag', 'Add items to your recycle bag before selling.');
      return;
    }

    // Navigate to Smart Matching screen
    navigation.navigate('SmartMatching', {
      totalItems,
      totalWeight,
      totalReward,
      totalCO2,
    });
    
    // Clear items after navigating
    clearAll();
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="leaf-outline" size={80} color={colors.primary} />
      </View>
      <Text style={styles.emptyTitle}>Your Recycle Bin is Empty</Text>
      <Text style={styles.emptySubtitle}>
        Start scanning recyclable items to add them here
      </Text>
      <TouchableOpacity style={styles.emptyButton}>
        <Ionicons name="scan" size={20} color={colors.textWhite} />
        <Text style={styles.emptyButtonText}>Scan Items</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Recycle Bin</Text>
          <Text style={styles.headerSubtitle}>{totalItems} items</Text>
        </View>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        renderEmptyState()
      ) : (
        <>
          {/* Summary Card */}
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.summaryCard}
          >
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Ionicons name="cube-outline" size={24} color={colors.textWhite} />
                <Text style={styles.summaryValue}>{totalItems}</Text>
                <Text style={styles.summaryLabel}>Items</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Ionicons name="speedometer-outline" size={24} color={colors.textWhite} />
                <Text style={styles.summaryValue}>{totalWeight} kg</Text>
                <Text style={styles.summaryLabel}>Weight</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Ionicons name="leaf" size={24} color={colors.textWhite} />
                <Text style={styles.summaryValue}>{totalCO2}g</Text>
                <Text style={styles.summaryLabel}>CO₂ Saved</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Items List */}
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.sectionTitle}>Your Items</Text>

            {items.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={[styles.itemIcon, { backgroundColor: withAlpha(item.color, 0.1) }]}>
                  <Ionicons name={item.icon as any} size={28} color={item.color} />
                </View>
                
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View style={styles.itemMetaRow}>
                    <View style={styles.itemMeta}>
                      <Ionicons name="pricetag-outline" size={14} color={colors.textSecondary} />
                      <Text style={styles.itemMetaText}>{item.category}</Text>
                    </View>
                    <View style={styles.itemMeta}>
                      <Ionicons name="fitness-outline" size={14} color={colors.textSecondary} />
                      <Text style={styles.itemMetaText}>{item.weight}</Text>
                    </View>
                    <View style={styles.itemMeta}>
                      <Ionicons name="leaf-outline" size={14} color={colors.success} />
                      <Text style={[styles.itemMetaText, { color: colors.success }]}>
                        {item.co2Saved}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.itemRight}>
                  <Text style={styles.itemReward}>+{item.reward} TND</Text>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveItem(item.id, item.name)}
                  >
                    <Ionicons name="trash-outline" size={20} color={colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* Add More Button */}
            <TouchableOpacity style={styles.addMoreButton}>
              <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
              <Text style={styles.addMoreText}>Scan More Items</Text>
            </TouchableOpacity>

            {/* Bottom spacing for fixed buttons */}
            <View style={{ height: 160 }} />
          </ScrollView>

          {/* Bottom Actions */}
          <View style={styles.bottomActions}>
            <View style={styles.totalSection}>
              <Text style={styles.totalLabel}>Total Reward</Text>
              <Text style={styles.totalValue}>{totalReward} TND</Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.scheduleButton}
                onPress={handleSchedulePickup}
              >
                <Ionicons name="calendar-outline" size={20} color={colors.primary} />
                <Text style={styles.scheduleButtonText}>Schedule</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sellButton}
                onPress={handleSellNow}
              >
                <LinearGradient
                  colors={[colors.primary, colors.primaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.sellButtonGradient}
                >
                  <Ionicons name="checkmark-circle" size={20} color={colors.textWhite} />
                  <Text style={styles.sellButtonText}>Sell Now</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  infoButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    borderRadius: 20,
    padding: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryDivider: {
    width: 1,
    height: 50,
    backgroundColor: withAlpha(colors.textWhite, 0.2),
  },
  summaryValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    marginTop: spacing.sm,
  },
  summaryLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textWhite,
    opacity: 0.9,
    marginTop: spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  itemIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  itemMetaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  itemMetaText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  itemRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  itemReward: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: withAlpha(colors.error, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: withAlpha(colors.primary, 0.08),
    borderRadius: 12,
    padding: spacing.md,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: withAlpha(colors.primary, 0.2),
    borderStyle: 'dashed',
  },
  addMoreText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: Platform.OS === 'ios' ? 34 : spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  totalLabel: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  totalValue: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: withAlpha(colors.primary, 0.1),
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: withAlpha(colors.primary, 0.2),
  },
  scheduleButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
  sellButton: {
    flex: 1.5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sellButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  sellButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    marginLeft: spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyIconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: withAlpha(colors.primary, 0.08),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  emptyTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.md * typography.lineHeight.relaxed,
    marginBottom: spacing.xl,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  emptyButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
  },
});
