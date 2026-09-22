import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function AppliedFilters({ selectedCategory, sortOption, onRemoveCategory, onRemoveSort, onClearAll }) {
  if (selectedCategory === 'all' && !sortOption) return null;

  const sortLabels = {
    'price-asc': 'Menor preço',
    'price-desc': 'Maior preço',
    'rating-desc': 'Mais populares',
    'recent': 'Mais recentes'
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {selectedCategory !== 'all' && (
          <View style={styles.chip}>
            <Text style={styles.chipText}>Categoria: {selectedCategory}</Text>
            <TouchableOpacity onPress={onRemoveCategory}>
              <Feather name="x" size={14} color="#4F46E5" />
            </TouchableOpacity>
          </View>
        )}

        {sortOption && (
          <View style={styles.chip}>
            <Text style={styles.chipText}>Ordenar: {sortLabels[sortOption]}</Text>
            <TouchableOpacity onPress={onRemoveSort}>
              <Feather name="x" size={14} color="#4F46E5" />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity onPress={onClearAll}>
          <Text style={styles.clearText}>Limpar filtros</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  scroll: { paddingHorizontal: 16, alignItems: 'center' },
  chip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF2FF', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, marginRight: 8 },
  chipText: { fontSize: 12, color: '#4F46E5', fontWeight: '600', marginRight: 6 },
  clearText: { fontSize: 12, color: '#4F46E5', fontWeight: '600', textDecorationLine: 'underline', marginLeft: 4 },
});