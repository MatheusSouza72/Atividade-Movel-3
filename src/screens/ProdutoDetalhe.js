import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header com Voltar e Favorito */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DETALHES</Text>
        <TouchableOpacity>
          <Feather name="heart" size={22} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Imagem */}
        <Image source={{ uri: product.thumbnail || product.images?.[0] }} style={styles.image} resizeMode="contain" />

        {/* Título e Categoria */}
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.category}>{product.category}</Text>

        {/* Preço */}
        <Text style={styles.price}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>

        {/* Descrição */}
        <Text style={styles.sectionHeader}>Descrição</Text>
        <Text style={styles.description}>{product.description}</Text>

        {/* Especificações */}
        <Text style={styles.sectionHeader}>Especificações</Text>
        <View style={styles.specsList}>
          {product.brand && <Text style={styles.specItem}>• Marca: {product.brand}</Text>}
          {product.stock !== undefined && <Text style={styles.specItem}>• Estoque: {product.stock} unidades</Text>}
          {product.warrantyInformation && <Text style={styles.specItem}>• Garantia: {product.warrantyInformation}</Text>}
          {product.shippingInformation && <Text style={styles.specItem}>• Frete: {product.shippingInformation}</Text>}
        </View>
      </ScrollView>

      {/* Botão Adicionar ao Carrinho */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnCart} activeOpacity={0.8}>
          <Feather name="shopping-bag" size={20} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.btnCartText}>Adicionar ao carrinho</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10 },
  headerTitle: { fontSize: 14, fontWeight: '800', letterSpacing: 1, color: '#0F172A' },
  content: { padding: 20 },
  image: { width: '100%', height: 250, borderRadius: 20, backgroundColor: '#F8FAFC', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '800', color: '#0F172A', marginBottom: 4 },
  category: { fontSize: 14, color: '#6366F1', fontWeight: '600', marginBottom: 12, textTransform: 'capitalize' },
  price: { fontSize: 24, fontWeight: '800', color: '#4F46E5', marginBottom: 20 },
  sectionHeader: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginTop: 10, marginBottom: 8 },
  description: { fontSize: 14, color: '#64748B', lineHeight: 22, marginBottom: 16 },
  specsList: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 12 },
  specItem: { fontSize: 13, color: '#334155', marginBottom: 6 },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  btnCart: { height: 52, backgroundColor: '#4F46E5', borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  btnCartText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
});