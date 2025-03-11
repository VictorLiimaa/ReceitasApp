import { View, FlatList, SafeAreaView, Text } from 'react-native';
import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { getFavorites, removeFavorite, Favorite } from '../utils/api';


export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  async function fetchFavorites() {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
    }
  }



  async function handleRemoveFavorite(fav: Favorite) {
    try {
      await removeFavorite(fav.id.toString());
      fetchFavorites();
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  }

  
  return (
    <SafeAreaView style={{ flex: 1, padding: 8, backgroundColor: '#FFFFFF', paddingBottom: 80 }}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum favorito adicionado.</Text>
        }
        renderItem={({ item }) => (
          <RecipeCard
            recipe={{
              id: item.recipe_id,
              name: item.name,
              instructions: item.instructions,
              imageUrl: item.image_url,
            }}
            isFavorite={true}
            onDelete={() => handleRemoveFavorite(item)}
          />
        )}
      />
    </SafeAreaView>
  );

}
