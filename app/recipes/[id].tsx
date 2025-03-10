import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, Button, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { saveRecipe } from '../../utils/api';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
}

export default function RecipeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>(); // 🔹 Define `id` corretamente
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => {
        if (response.data.meals) {
          setRecipe(response.data.meals[0]);
        } else {
          console.error('Receita não encontrada');
        }
      })
      .catch(error => console.error('Erro ao buscar receita:', error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (!recipe) return <Text>Receita não encontrada.</Text>;

  return (
    <View>
      <Image source={{ uri: recipe.strMealThumb }} style={{ width: 200, height: 200 }} />
      <Text>{recipe.strMeal}</Text>
      <Text>{recipe.strInstructions}</Text>
      <Button title="Salvar como Favorito" onPress={() => saveRecipe(recipe)} />
    </View>
  );
}
