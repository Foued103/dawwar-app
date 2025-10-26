import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';
import { withAlpha } from '../utils/color';
import { useRecycleBin } from '../context/RecycleBinContext';
import { useMarketplace } from '../context/MarketplaceContext';
import type { MarketplaceStackParamList } from '../navigation/MarketplaceStackNavigator';

type MarketplaceScreenNavigationProp = StackNavigationProp<MarketplaceStackParamList, 'MarketplaceMain'>;

export default function MarketplaceScreen() {
  const navigation = useNavigation<MarketplaceScreenNavigationProp>();
  const { getTotalStats } = useRecycleBin();
  const { totalItems } = getTotalStats();
  const { listings } = useMarketplace();
  const categories = [
    { id: '1', name: 'Plastic', icon: 'cube-outline' as const, color: '#3B82F6' },
    { id: '2', name: 'Paper', icon: 'document-outline' as const, color: '#F59E0B' },
    { id: '3', name: 'Metal', icon: 'hardware-chip-outline' as const, color: '#6B7280' },
    { id: '4', name: 'Glass', icon: 'wine-outline' as const, color: '#10B981' },
  ];

  const nearbyBuyers = [
    { id: '1', name: 'EcoRecycle Center', distance: '1.2 km', rating: 4.8, price: '2.5 TND/kg' },
    { id: '2', name: 'Green Valley Recycling', distance: '2.4 km', rating: 4.6, price: '2.3 TND/kg' },
    { id: '3', name: 'Tunisia Waste Solutions', distance: '3.1 km', rating: 4.9, price: '2.7 TND/kg' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Marketplace</Text>
          <Text style={styles.headerSubtitle}>Sell your recyclables</Text>
        </View>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('RecycleBin')}
        >
          <Ionicons name="cart-outline" size={24} color={colors.text} />
          {totalItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { backgroundColor: withAlpha(category.color, 0.08) }]}
              >
                <View style={[styles.categoryIconContainer, { backgroundColor: category.color }]}>
                  <Ionicons name={category.icon} size={24} color={colors.textWhite} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Marketplace Listings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Marketplace Listings</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {listings.slice(0, 3).map((listing) => (
            <TouchableOpacity 
              key={listing.id} 
              style={styles.listingCard}
              onPress={() => navigation.navigate('ItemDetail', { listingId: listing.id })}
            >
              <View style={styles.listingHeader}>
                <Text style={styles.listingTitle}>{listing.title}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{listing.category}</Text>
                </View>
              </View>
              {listing.description ? (
                <Text style={styles.listingDescription} numberOfLines={2}>
                  {listing.description}
                </Text>
              ) : null}
              <View style={styles.listingMeta}>
                <View style={styles.listingMetaItem}>
                  <Ionicons name="person-outline" size={14} color={colors.textSecondary} />
                  <Text style={styles.listingMetaText}>{listing.sellerName}</Text>
                </View>
                <View style={styles.listingMetaItem}>
                  <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                  <Text style={styles.listingMetaText}>{listing.location}</Text>
                </View>
                <View style={styles.listingMetaItem}>
                  <Ionicons name="cube-outline" size={14} color={colors.textSecondary} />
                  <Text style={styles.listingMetaText}>{listing.weight}</Text>
                </View>
              </View>
              <View style={styles.listingFooter}>
                <View style={styles.conditionTag}>
                  <Text style={styles.conditionTagText}>{listing.condition}</Text>
                </View>
                <Text style={styles.listingPrice}>{listing.price.toFixed(1)} TND</Text>
              </View>
            </TouchableOpacity>
          ))}

          {listings.length === 0 && (
            <View style={styles.emptyListings}>
              <Ionicons name="cube-outline" size={48} color={colors.textLight} />
              <Text style={styles.emptyListingsText}>No listings yet</Text>
              <Text style={styles.emptyListingsSubtext}>Be the first to list your items!</Text>
            </View>
          )}
        </View>

        {/* Nearby Buyers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Buyers</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {nearbyBuyers.map((buyer) => (
            <TouchableOpacity key={buyer.id} style={styles.buyerCard}>
              <View style={styles.buyerIconContainer}>
                <Ionicons name="business-outline" size={28} color={colors.primary} />
              </View>
              <View style={styles.buyerInfo}>
                <Text style={styles.buyerName}>{buyer.name}</Text>
                <View style={styles.buyerDetails}>
                  <View style={styles.buyerDetailItem}>
                    <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                    <Text style={styles.buyerDetailText}>{buyer.distance}</Text>
                  </View>
                  <View style={styles.buyerDetailItem}>
                    <Ionicons name="star" size={14} color={colors.warning} />
                    <Text style={styles.buyerDetailText}>{buyer.rating}</Text>
                  </View>
                </View>
                <Text style={styles.buyerPrice}>{buyer.price}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => navigation.navigate('RecycleBin')}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: withAlpha(colors.success, 0.08) }]}>
                <Ionicons name="bag-handle-outline" size={28} color={colors.success} />
              </View>
              <Text style={styles.actionTitle}>My Bag</Text>
              <Text style={styles.actionSubtitle}>View items to sell</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => navigation.navigate('CreateListing')}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: withAlpha(colors.primary, 0.08) }]}>
                <Ionicons name="add-circle-outline" size={28} color={colors.primary} />
              </View>
              <Text style={styles.actionTitle}>List Item</Text>
              <Text style={styles.actionSubtitle}>Sell on marketplace</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIconContainer, { backgroundColor: withAlpha(colors.secondary, 0.08) }]}>
                <Ionicons name="time-outline" size={28} color={colors.secondary} />
              </View>
              <Text style={styles.actionTitle}>History</Text>
              <Text style={styles.actionSubtitle}>View past sales</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  headerTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  cartButton: {
    position: 'relative',
    padding: spacing.sm,
  },
  cartBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: colors.textWhite,
    fontSize: 11,
    fontWeight: typography.fontWeight.bold,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  seeAllText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  categoriesScroll: {
    marginHorizontal: -spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  categoryCard: {
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 16,
    marginRight: spacing.md,
    minWidth: 100,
  },
  categoryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  buyerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  buyerIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: withAlpha(colors.primary, 0.08),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  buyerInfo: {
    flex: 1,
  },
  buyerName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  buyerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  buyerDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  buyerDetailText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  buyerPrice: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: spacing.md,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  actionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  actionSubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  listingCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  listingTitle: {
    flex: 1,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginRight: spacing.sm,
  },
  categoryBadge: {
    backgroundColor: withAlpha(colors.primary, 0.1),
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
  listingDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  listingMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  listingMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listingMetaText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  listingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  conditionTag: {
    backgroundColor: withAlpha(colors.success, 0.1),
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  conditionTagText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.success,
  },
  listingPrice: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  emptyListings: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyListingsText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  emptyListingsSubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.textLight,
    marginTop: spacing.xs,
  },
});
