import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface IRecipe {
  id: number;
  name: string;
  instructions: string;
  imageUrl: string;
}

interface RecipeCardProps {
  recipe: IRecipe;
  onPress?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  onDelete?: () => void;
}


export default function RecipeCard({
  recipe,
  onPress,
  onToggleFavorite,
  isFavorite = false,
  onDelete,
}: RecipeCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Image
        source={{ uri: recipe.imageUrl || 'https://picsum.photos/seed/default/300/200' }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.instructions} numberOfLines={2}>
          {recipe.instructions}
        </Text>
      </View>

      {onToggleFavorite && (
        <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteButton}>
          <FontAwesome name={isFavorite ? 'star' : 'star-o'} size={20} color="#000000" />
        </TouchableOpacity>
      )}

      {onDelete && (
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <FontAwesome name="trash" size={20} color="#000000" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#B3E5FC',
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#ffffff',
  },
  textContainer: {
    padding: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 4,
  },
  instructions: {
    color: '#000000',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 6,
  },
  deleteButton: {
    position: 'absolute',
    top: 40,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 6,
  },

});
