import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SHADOWS, SIZES, FONTS } from "../constants/theme";

const { width } = Dimensions.get('window');

interface CardProps {
  title: string;
  price: number | string;
  description: string;
  image?: string;
  onDetailsPress: () => void;
}

export default function Card({ title, price, description, image, onDetailsPress }: CardProps) {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onDetailsPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        {image ? (
          <Image 
            source={{ uri: image }} 
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={50} color={COLORS.textLight} />
          </View>
        )}
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>{price} ₾</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={onDetailsPress}>
            <Text style={styles.buttonText}>დეტალები</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.textWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius.lg,
    marginHorizontal: SIZES.md,
    marginBottom: SIZES.md,
    ...SHADOWS.medium,
    overflow: "hidden",
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: COLORS.surfaceLight,
  },
  imagePlaceholder: {
    width: "100%",
    height: 180,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceTag: {
    position: 'absolute',
    bottom: SIZES.sm,
    right: SIZES.sm,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.borderRadius.full,
    ...SHADOWS.small,
  },
  priceText: {
    color: COLORS.textWhite,
    fontSize: SIZES.font.md,
    ...FONTS.bold,
  },
  content: {
    padding: SIZES.md,
  },
  title: {
    fontSize: SIZES.font.lg,
    color: COLORS.text,
    marginBottom: SIZES.xs,
    ...FONTS.bold,
  },
  description: {
    fontSize: SIZES.font.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SIZES.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.borderRadius.md,
    gap: SIZES.xs,
  },
  buttonText: {
    color: COLORS.textWhite,
    fontSize: SIZES.font.sm,
    ...FONTS.semiBold,
  },
});
