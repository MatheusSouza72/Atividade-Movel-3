import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';

// Importação dos Componentes
import CategoryList from './src/components/CategoriaLista';
import ProductCard from './src/components/ProdutoCard';
import FilterModal from './src/components/FiltroModal';
import AppliedFilters from './src/components/FiltroAplicado';
import ProductDetailScreen from './src/screens/ProdutoDetalhe';
import BottomNavigation from './src/components/BottomNavigation';

const Stack = createNativeStackNavigator();

// --- TELA PRINCIPAL (LISTA DE PRODUTOS) ---
function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados dos Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  // Estado da Aba Ativa da Navegação Inferior
  const [currentTab, setCurrentTab] = useState('home');

  // 1. Carregar Categorias
  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      ? fetch('https://dummyjson.com/products/categories')
          .then((res) => res.json())
          .then((data) => setCategories(data))
          .catch((err) => console.error('Erro ao buscar categorias:', err))
      : null;
  }, []);

  // 2. Carregar Produtos com base no Filtro/Busca
  useEffect(() => {
    setLoading(true);

    let url = 'https://dummyjson.com/products';

    if (searchQuery.trim() !== '') {
      url = `https://dummyjson.com/products/search?q=${searchQuery}`;
    } else if (selectedCategory !== 'all') {
      url = `https://dummyjson.com/products/category/${selectedCategory}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let list = data.products || [];

        // Aplicação de Ordenação Local
        if (sortOption === 'price-asc') {
          list.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-desc') {
          list.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'rating-desc') {
          list.sort((a, b) => b.rating - a.rating);
        }

        setProducts(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao carregar produtos:', err);
        setLoading(false);
      });
  }, [searchQuery, selectedCategory, sortOption]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSortOption('');
    setSearchQuery('');
  };

  const handleTabPress = (tabId) => {
    setCurrentTab(tabId);
  };

  // Contagem de filtros ativos para a badge do botão "Filtrar"
  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) + (sortOption ? 1 : 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Feather name="menu" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PRODUCT EXPLORER</Text>
        <TouchableOpacity>
          <Feather name="bell" size={22} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* Barra de Pesquisa e Botão Filtrar */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Feather name="search" size={18} color="#94A3B8" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar produto..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setIsFilterModalVisible(true)}
        >
          <Feather name="sliders" size={16} color="#4F46E5" />
          <Text style={styles.filterBtnText}>Filtrar</Text>
          {activeFiltersCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{activeFiltersCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Lista Principal com Scroll */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          />
        )}
        ListHeaderComponent={
          <>
            {/* Categorias */}
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Chips de Filtros Aplicados */}
            <AppliedFilters
              selectedCategory={selectedCategory}
              sortOption={sortOption}
              onRemoveCategory={() => setSelectedCategory('all')}
              onRemoveSort={() => setSortOption('')}
              onClearAll={handleResetFilters}
            />

            {/* Título da Seção */}
            <Text style={styles.sectionTitle}>Produtos em destaque</Text>
          </>
        }
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
            </View>
          )
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Loader */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#4F46E5" />
        </View>
      )}

      {/* Modal de Filtros */}
      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        sortOption={sortOption}
        onSelectSort={setSortOption}
        onReset={handleResetFilters}
      />

      {/* Barra de Navegação Inferior (Bottom Bar Funcional) */}
      <BottomNavigation
        activeTab={currentTab}
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
}

// --- CONFIGURAÇÃO DA NAVEGAÇÃO DO APP ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
    gap: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
  },
  filterBtnText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '700',
    color: '#4F46E5',
  },
  badge: {
    backgroundColor: '#4F46E5',
    borderRadius: 10,
    width: 18,
    height: 18,
    justify: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 4,
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 150,
    left: 0,
    right: 0,
    bottom: 0,
    justify: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
});