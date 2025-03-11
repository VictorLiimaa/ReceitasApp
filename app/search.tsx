import { useState } from 'react';
import { View, FlatList, TextInput, SafeAreaView } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { getRecipes, Recipe } from '../utils/api';


export default function SearchScreen() {
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query) return;
    const recipes = await getRecipes();
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredRecipes);
  };

  
  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: '#FFFFFF', paddingBottom: 80 }}>
      <View style={{ marginBottom: 16 }}>
        <TextInput
          style={{
            backgroundColor: '#F0F0F0',
            padding: 12,
            borderRadius: 8,
          }}
          placeholder="Pesquisar receitas..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
      />
    </SafeAreaView>
  );
}
