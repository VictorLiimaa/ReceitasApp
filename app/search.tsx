import { useState } from 'react';
import { View, FlatList, TextInput } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { getRecipes, Recipe } from '../utils/api';

export default function SearchScreen() {
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query) return;
    const recipes = await getRecipes();
    const filteredRecipes = recipes.filter(recipe =>
      recipe.strMeal.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredRecipes);
  };

  return (
    <View className="p-4">
      <TextInput
        className="bg-gray-200 p-2 rounded-lg"
        placeholder="Pesquisar receitas..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
      />
    </View>
  );
}
