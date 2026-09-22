import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Mapeamento de ícones para categorias comuns da API
const CATEGORY_ICONS = {
  all: 'grid',
  beauty: 'heart',
  fragrances: 'droplet',
  furniture: 'home',
  groceries: 'shopping-cart',
  smartphones: 'smartphone',
  laptops: 'monitor',
  audio: 'headphones',
  wearables: 'watch',
};

export default function CategoryList({ categories, selectedCategory, onSelectCategory }) {
  const getIcon = (slug) => CATEGORY_ICONS[slug.toLowerCase()] || 'tag';

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Categorias</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Opção TODOS */}
        <TouchableOpacity 
          style={styles.itemContainer} 
          onPress={() => onSelectCategory('all')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconBox, selectedCategory === 'all' && styles.iconBoxSelected]}>
            <Feather 
              name="grid" 
              size={22} 
              color={selectedCategory === 'all' ? '#FFF' : '#64748B'} 
            />
          </View>
          <Text style={[styles.label, selectedCategory === 'all' && styles.labelSelected]}>Todos</Text>
        </TouchableOpacity>

        {/* Categorias da API */}
        {categories.map((cat) => {
          const slug = typeof cat === 'string' ? cat : cat.slug;
          const name = typeof cat === 'string' ? cat : cat.name;
          const isSelected = selectedCategory === slug;

          return (
            <TouchableOpacity 
              key={slug} 
              style={styles.itemContainer} 
              onPress={() => onSelectCategory(slug)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBox, isSelected && styles.iconBoxSelected]}>
                <Feather 
                  name={getIcon(slug)} 
                  size={22} 
                  color={isSelected ? '#FFF' : '#64748B'} 
                />
              </View>
              <Text style={[styles.label, isSelected && styles.labelSelected]} numberOfLines={1}>
                {name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A', paddingHorizontal: 16, marginBottom: 12 },
  scroll: { paddingHorizontal: 16 },
  itemContainer: { alignItems: 'center', marginRight: 16, width: 68 },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 6,
  },
  iconBoxSelected: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  label: { fontSize: 11, color: '#64748B', fontWeight: '500', textAlign: 'center' },
  labelSelected: { color: '#4F46E5', fontWeight: '700' },
});