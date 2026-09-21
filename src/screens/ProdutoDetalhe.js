import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Novos Estados para Interatividade
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Cálculo do preço original e desconto
  const hasDiscount = product.discountPercentage > 0;
  const originalPrice = hasDiscount ? product.price / (1 - product.discountPercentage / 100) : product.price;

  // Handlers das Ações
  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const handleIncreaseQuantity = () => {
    if (product.stock !== undefined && quantity >= product.stock) {
      Alert.alert('Estoque Limitado', `Apenas ${product.stock} unidades disponíveis.`);
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    Alert.alert(
      'Sucesso!',
      `${quantity}x "${product.title}" adicionado(s) ao carrinho.`,
      [{ text: 'OK' }]
    );
  };

  // Função para desenhar as estrelas
  const renderStars = (rating) => {
    const stars = [];
    const rounded = Math.round(rating || 0);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Feather key={i} name="star" size={13} color={i <= rounded ? '#F59E0B' : '#CBD5E1'} style={{ marginRight: 2 }} />
      );
    }
    return stars;
  };

  const imagesList = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header com Voltar e Favorito Interativo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DETALHES DO PRODUTO</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Feather name="heart" size={22} color={isFavorite ? '#EF4444' : '#0F172A'} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Carrossel de Imagens */}
        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const slide = Math.ceil(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
              if (slide !== activeImageIndex) setActiveImageIndex(slide);
            }}
            scrollEventThrottle={16}
          >
            {imagesList.map((imgUrl, idx) => (
              <Image key={idx} source={{ uri: imgUrl }} style={styles.image} resizeMode="contain" />
            ))}
          </ScrollView>
          {imagesList.length > 1 && (
            <View style={styles.pagination}>
              {imagesList.map((_, idx) => (
                <View key={idx} style={[styles.dot, activeImageIndex === idx && styles.activeDot]} />
              ))}
            </View>
          )}
        </View>

        {/* Categoria e Título */}
        <Text style={styles.category}>{product.brand || product.category}</Text>
        <Text style={styles.title}>{product.title}</Text>

        {/* Média de Avaliações */}
        <View style={styles.ratingRow}>
          {renderStars(product.rating)}
          <Text style={styles.ratingText}>{product.rating?.toFixed(1)}</Text>
          <Text style={styles.reviewsCount}>({product.reviews?.length || 0} avaliações)</Text>
        </View>

        {/* Bloco de Preços e Desconto */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
          {hasDiscount && (
            <>
              <Text style={styles.originalPrice}>R$ {originalPrice.toFixed(2).replace('.', ',')}</Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{Math.round(product.discountPercentage)}% OFF</Text>
              </View>
            </>
          )}
        </View>

        {/* Frete e Garantia */}
        {(product.shippingInformation || product.warrantyInformation) && (
          <View style={styles.featuresRow}>
            {product.shippingInformation && (
              <View style={styles.featureBox}>
                <Feather name="truck" size={16} color="#4F46E5" />
                <Text style={styles.featureText}>{product.shippingInformation}</Text>
              </View>
            )}
            {product.warrantyInformation && (
              <View style={styles.featureBox}>
                <Feather name="shield" size={16} color="#4F46E5" />
                <Text style={styles.featureText}>{product.warrantyInformation}</Text>
              </View>
            )}
          </View>
        )}

        {/* Descrição */}
        <Text style={styles.sectionHeader}>Descrição</Text>
        <Text style={styles.description}>{product.description}</Text>

        {/* Especificações Técnicas */}
        <Text style={styles.sectionHeader}>Especificações Técnicas</Text>
        <View style={styles.specsList}>
          {product.brand && <Text style={styles.specItem}>• Marca: {product.brand}</Text>}
          {product.sku && <Text style={styles.specItem}>• SKU: {product.sku}</Text>}
          {product.stock !== undefined && <Text style={styles.specItem}>• Estoque: {product.stock} unidades ({product.availabilityStatus})</Text>}
          {product.weight && <Text style={styles.specItem}>• Peso: {product.weight} kg</Text>}
          {product.dimensions && (
            <Text style={styles.specItem}>
              • Dimensões: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
            </Text>
          )}
          {product.returnPolicy && <Text style={styles.specItem}>• Devolução: {product.returnPolicy}</Text>}
        </View>

        {/* Comentários dos Clientes */}
        {product.reviews && product.reviews.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>Comentários dos Clientes</Text>
            {product.reviews.map((rev, index) => (
              <View key={index} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{rev.reviewerName?.charAt(0)}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.reviewerName}>{rev.reviewerName}</Text>
                    <View style={{ flexDirection: 'row' }}>{renderStars(rev.rating)}</View>
                  </View>
                  <Text style={styles.reviewDate}>{new Date(rev.date).toLocaleDateString('pt-BR')}</Text>
                </View>
                <Text style={styles.reviewComment}>{rev.comment}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>

      {/* Footer com Controle de Quantidade e Botão de Adicionar ao Carrinho */}
      <View style={styles.footer}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={handleDecreaseQuantity}
            disabled={quantity <= 1}
          >
            <Feather name="minus" size={16} color={quantity <= 1 ? '#CBD5E1' : '#0F172A'} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={handleIncreaseQuantity}>
            <Feather name="plus" size={16} color="#0F172A" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnCart} activeOpacity={0.8} onPress={handleAddToCart}>
          <Feather name="shopping-bag" size={20} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.btnCartText}>
            Adicionar • R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10 },
  headerTitle: { fontSize: 13, fontWeight: '800', letterSpacing: 1, color: '#0F172A' },
  content: { padding: 20 },
  carouselContainer: { position: 'relative', marginBottom: 16 },
  image: { width: width - 40, height: 240, borderRadius: 16, backgroundColor: '#F8FAFC' },
  pagination: { position: 'absolute', bottom: 10, flexDirection: 'row', alignSelf: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#CBD5E1', marginHorizontal: 3 },
  activeDot: { backgroundColor: '#4F46E5', width: 14 },
  category: { fontSize: 12, color: '#6366F1', fontWeight: '700', textTransform: 'uppercase', marginBottom: 2 },
  title: { fontSize: 20, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#0F172A', marginLeft: 4 },
  reviewsCount: { fontSize: 12, color: '#94A3B8', marginLeft: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  price: { fontSize: 22, fontWeight: '800', color: '#4F46E5' },
  originalPrice: { fontSize: 14, color: '#94A3B8', textDecorationLine: 'line-through' },
  discountBadge: { backgroundColor: '#DC2626', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  discountText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  featuresRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  featureBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF2FF', padding: 10, borderRadius: 10, gap: 6 },
  featureText: { fontSize: 11, color: '#312E81', fontWeight: '600', flex: 1 },
  sectionHeader: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginTop: 14, marginBottom: 8 },
  description: { fontSize: 13, color: '#64748B', lineHeight: 20, marginBottom: 10 },
  specsList: { backgroundColor: '#F8FAFC', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  specItem: { fontSize: 12, color: '#334155', marginBottom: 6 },
  reviewCard: { backgroundColor: '#F8FAFC', padding: 12, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#F1F5F9' },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#6366F1', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  reviewerName: { fontSize: 12, fontWeight: '700', color: '#0F172A' },
  reviewDate: { fontSize: 10, color: '#94A3B8' },
  reviewComment: { fontSize: 12, color: '#475569', lineHeight: 16 },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 4,
    height: 48,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    justify: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    paddingHorizontal: 8,
  },
  btnCart: {
    flex: 1,
    height: 48,
    backgroundColor: '#4F46E5',
    borderRadius: 14,
    flexDirection: 'row',
    justify: 'center',
    alignItems: 'center',
  },
  btnCartText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
});