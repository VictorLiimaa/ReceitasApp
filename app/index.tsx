import { SafeAreaView, FlatList, ActivityIndicator, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import RecipeCard from '../components/RecipeCard';
import {
  getRecipes,
  getFavorites,
  saveRecipe,
  removeFavorite,
  removeRecipe,
  Recipe,
  Favorite,
} from '../utils/api';


export default function HomeScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchRecipes();
    fetchFavorites();
  }, []);



  async function fetchRecipes() {
    try {
      setError(null);
      setLoading(true);
      const data = await getRecipes();
      if (!data || data.length === 0) {
        setError('Nenhuma receita cadastrada ainda.');
      } else {
        setRecipes(data);
      }
    } catch (err) {
      console.error('Erro ao buscar receitas:', err);
      setError('Erro ao carregar receitas.');
    } finally {
      setLoading(false);
    }
  }



  async function fetchFavorites() {
    try {
      const favData = await getFavorites();
      setFavorites(favData);
    } catch (err) {
      console.error('Erro ao buscar favoritos:', err);
    }
  }



  async function toggleFavorite(recipe: Recipe) {
    try {
      const favoriteRecord = favorites.find((fav) => fav.recipe_id === recipe.id);

      if (favoriteRecord) {
        await removeFavorite(favoriteRecord.id.toString());
      } else {
        await saveRecipe(recipe);
      }
      fetchFavorites();
    } catch (err) {
      console.error('Erro ao alternar favorito:', err);
    }
  }



  async function handleDelete(recipe: Recipe) {
    try {
      await removeRecipe(recipe.id.toString());
      fetchRecipes();
    } catch (err) {
      console.error('Erro ao deletar receita:', err);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#B3E5FC" />
      </View>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={{ flex: 1, padding: 8, backgroundColor: '#FFFFFF', paddingBottom: 80 }}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const favoriteRecord = favorites.find((fav) => fav.recipe_id === item.id);
          const isFavorite = !!favoriteRecord;

          return (
            <RecipeCard
              recipe={item}
              isFavorite={isFavorite}
              onToggleFavorite={() => toggleFavorite(item)}
              onDelete={() => handleDelete(item)}
              onPress={() => router.push(`/recipes/${item.id}`)}
            />
          );
        }}
      />
    </SafeAreaView>
  );

}
