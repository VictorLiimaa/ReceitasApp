import axios from 'axios';

export interface Recipe {
  id: number;
  name: string;
  instructions: string;
  imageUrl: string;
}

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getRecipes = async (): Promise<Recipe[]> => {
  const response = await api.get('/recipes');
  return response.data;
};

export const getFavorites = async (): Promise<Recipe[]> => {
  const response = await api.get('/favorites');
  return response.data;
};

export const saveRecipe = async (recipe: Recipe): Promise<void> => {
  await api.post('/favorites', {
    recipe_id: recipe.id,
    name: recipe.name,
    instructions: recipe.instructions,
    image_url: recipe.imageUrl,
  });
};

export const removeFavorite = async (idMeal: string): Promise<void> => {
  await api.delete(`/favorites/${idMeal}`);
};
