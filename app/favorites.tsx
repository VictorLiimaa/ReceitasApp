import { View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { getFavorites, Recipe } from '../utils/api';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const data = await getFavorites();
        setFavorites(data);
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
      }
    }
    fetchFavorites();
  }, []);

  return (
    <View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
      />
    </View>
  );
}
