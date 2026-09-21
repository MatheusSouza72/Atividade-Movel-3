import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ProductCard({ product, onPress, onToggleFavorite, isFavoriteInitial = false }) {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);

  const handleFavoritePress = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    if (onToggleFavorite) {
      onToggleFavorite(product, newState);
    }
  };

  const hasDiscount = product.discountPercentage > 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {/* Container da Imagem com Badge de Desconto */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.thumbnail || product.images?.[0] }}
          style={styles.image}
          resizeMode="contain"
        />
        {hasDiscount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{Math.round(product.discountPercentage)}%</Text>
          </View>
        )}
      </View>

      {/* Informações do Produto */}
      <View style={styles.info}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>

        {/* Avaliação */}
        <View style={styles.ratingRow}>
          <Feather name="star" size={12} color="#F59E0B" />
          <Text style={styles.ratingText}>{product.rating?.toFixed(1) || '0.0'}</Text>
          <Text style={styles.stockText}>• {product.stock} disp.</Text>
        </View>

        {/* Preço */}
        <Text style={styles.price}>R$ {product.price?.toFixed(2).replace('.', ',')}</Text>
      </View>

      {/* Botão de Favoritar */}
      <TouchableOpacity
        style={[styles.favoriteBtn, isFavorite && styles.favoriteBtnActive]}
        onPress={handleFavoritePress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Feather
          name="heart"
          size={18}
          color={isFavorite ? '#EF4444' : '#94A3B8'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    // Sombra para iOS e Android
    shadowColor: '#475569',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: 76,
    height: 76,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justify: 'center',
    alignItems: 'center',
    padding: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  discountBadge: {
    position: 'absolute',
    top: 2,
    left: 2,
    backgroundColor: '#EF4444',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  info: {
    flex: 1,
    marginLeft: 14,
    justify: 'center',
  },
  category: {
    fontSize: 10,
    color: '#6366F1',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginVertical: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 11,
    color: '#0F172A',
    fontWeight: '700',
    marginLeft: 3,
  },
  stockText: {
    fontSize: 11,
    color: '#94A3B8',
    marginLeft: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: '#4F46E5',
  },
  favoriteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justify: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  favoriteBtnActive: {
    backgroundColor: '#FEE2E2',
  },
});