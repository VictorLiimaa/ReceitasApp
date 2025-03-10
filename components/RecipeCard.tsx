import { View, Text, Image, TouchableOpacity } from 'react-native';

interface Recipe {
  recipe: {
    id: number;
    name: string;
    instructions: string;
    imageUrl: string;
  };
  onPress: () => void;
}

export default function RecipeCard({ recipe, onPress }: Recipe) {
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#fff', marginBottom: 8 }}>
      <Image source={{ uri: recipe.imageUrl }} style={{ width: '100%', height: 200 }} />
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{recipe.name}</Text>
      <Text numberOfLines={2}>{recipe.instructions}</Text>
    </TouchableOpacity>
  );
}
