import { SafeAreaView, FlatList, ActivityIndicator, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import RecipeCard from '../components/RecipeCard';
import { getRecipes, Recipe } from '../utils/api';

export default function HomeScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setError(null);
        const data = await getRecipes(); 
        console.log('Receitas retornadas:', data);

        if (!data || data.length === 0) {
          setError("Nenhuma receita encontrada.");
        } else {
          setRecipes(data);
        }
      } catch (err) {
        console.error("Erro ao buscar receitas:", err);
        setError("Erro ao carregar receitas.");
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        className="flex-1 justify-center items-center"
      />
    );
  }

  if (error) {
    return <Text className="text-center text-red-500">{error}</Text>;
  }

  return (
    <SafeAreaView className="flex-1 p-4 bg-gray-100">
      <FlatList
        data={recipes}
        keyExtractor={(item, index) => {
          return item.id ? item.id.toString() : index.toString();
        }}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => router.push(`/recipes/${item.id}`)}
          />
        )}
      />
    </SafeAreaView>
  );
}
