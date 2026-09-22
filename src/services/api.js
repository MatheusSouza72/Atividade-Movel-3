const BASE_URL = 'https://dummyjson.com/products';

export const fetchProducts = async (query = '', category = '') => {
  try {
    let url = BASE_URL;

    if (query) {
      url = `${BASE_URL}/search?q=${encodeURIComponent(query)}`;
    } else if (category && category !== 'all') {
      url = `${BASE_URL}/category/${category}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
};