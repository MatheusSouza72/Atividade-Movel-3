import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const CATEGORIES_GRID = [
  { slug: 'all', name: 'Todos', icon: 'grid' },
  { slug: 'smartphones', name: 'Smartphones', icon: 'smartphone' },
  { slug: 'laptops', name: 'Laptops', icon: 'monitor' },
  { slug: 'audio', name: 'Áudio', icon: 'headphones' },
  { slug: 'wearables', name: 'Wearables', icon: 'watch' },
  { slug: 'beauty', name: 'Beleza', icon: 'heart' },
  { slug: 'fragrances', name: 'Perfumes', icon: 'droplet' },
  { slug: 'furniture', name: 'Móveis', icon: 'home' },
];

export default function FilterModal({ visible, onClose, selectedCategory, onSelectCategory, sortOption, onSelectSort, onReset }) {
  const sortOptions = [
    { label: 'Mais recentes', value: 'recent' },
    { label: 'Menor preço', value: 'price-asc' },
    { label: 'Maior preço', value: 'price-desc' },
    { label: 'Mais populares', value: 'rating-desc' },
  ];

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FILTRAR</Text>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={24} color="#0F172A" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
          {/* Seção Categorias */}
          <Text style={styles.sectionTitle}>Categorias</Text>
          <View style={styles.grid}>
            {CATEGORIES_GRID.map((item) => {
              const isSelected = selectedCategory === item.slug;
              return (
                <TouchableOpacity
                  key={item.slug}
                  style={[styles.gridCard, isSelected && styles.gridCardSelected]}
                  onPress={() => onSelectCategory(item.slug)}
                >
                  <Feather name={item.icon} size={24} color={isSelected ? '#4F46E5' : '#64748B'} />
                  <Text style={[styles.gridLabel, isSelected && styles.gridLabelSelected]}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Seção Ordenação */}
          <Text style={styles.sectionTitle}>Ordenação</Text>
          {sortOptions.map((opt) => {
            const isSelected = sortOption === opt.value;
            return (
              <TouchableOpacity
                key={opt.value}
                style={styles.radioRow}
                onPress={() => onSelectSort(opt.value)}
              >
                <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
                <Text style={[styles.radioText, isSelected && styles.radioTextSelected]}>{opt.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Rodapé com Ações */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.btnReset} onPress={onReset}>
            <Text style={styles.btnResetText}>Limpar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnApply} onPress={onClose}>
            <Text style={styles.btnApplyText}>Aplicar filtros</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A', letterSpacing: 1 },
  body: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginTop: 12, marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  gridCard: { width: '47%', backgroundColor: '#F8FAFC', paddingVertical: 18, borderRadius: 16, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  gridCardSelected: { borderColor: '#4F46E5', backgroundColor: '#EEF2FF' },
  gridLabel: { marginTop: 8, fontSize: 12, color: '#64748B', fontWeight: '600' },
  gridLabelSelected: { color: '#4F46E5', fontWeight: '700' },
  radioRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  radioOuterSelected: { borderColor: '#4F46E5' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4F46E5' },
  radioText: { fontSize: 14, color: '#64748B' },
  radioTextSelected: { color: '#0F172A', fontWeight: '700' },
  footer: { flexDirection: 'row', padding: 20, gap: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  btnReset: { flex: 1, height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center' },
  btnResetText: { color: '#4F46E5', fontWeight: '700' },
  btnApply: { flex: 2, height: 48, borderRadius: 12, backgroundColor: '#4F46E5', justifyContent: 'center', alignItems: 'center' },
  btnApplyText: { color: '#FFFFFF', fontWeight: '700' },
});