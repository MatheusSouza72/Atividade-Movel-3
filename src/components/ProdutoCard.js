import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ProductCard({ product, onPress }) {
  // Cálculo de Preço com Desconto
  const finalPrice = product.discountPercentage 
    ? product.price * (1 - product.discountPercentage / 100) 
    : product.price;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: product.thumbnail || product.images?.[0] }} style={styles.image} resizeMode="contain" />
      
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>R$ {finalPrice.toFixed(2).replace('.', ',')}</Text>
      </View>

      <Feather name="chevron-right" size={20} color="#94A3B8" />
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
    // Sombra leve
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  image: { width: 64, height: 64, borderRadius: 12, backgroundColor: '#F8FAFC' },
  info: { flex: 1, marginLeft: 14, justifyContent: 'center' },
  title: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 2 },
  category: { fontSize: 12, color: '#6366F1', textTransform: 'capitalize', fontWeight: '500', marginBottom: 4 },
  price: { fontSize: 14, fontWeight: '800', color: '#4F46E5' },
});