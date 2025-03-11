import axios from 'axios';

export interface Recipe {
  id: number;
  name: string;
  instructions: string;
  imageUrl: string;
}


export interface Favorite {
  id: number;         
  recipe_id: number;   
  name: string;
  instructions: string;
  image_url: string;  
}


const API_URL = 'http://192.168.1.42:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});



export const getRecipes = async (): Promise<Recipe[]> => {
  const response = await api.get('/recipes');
  return response.data.map((r: any) => ({
    id: r.id,
    name: r.name,
    instructions: r.instructions,
    imageUrl: r.image_url,
  }));
};



export const getFavorites = async (): Promise<Favorite[]> => {
  const response = await api.get('/favorites');
  return response.data.map((f: any) => ({
    id: f.id,
    recipe_id: f.recipe_id,
    name: f.name,
    instructions: f.instructions,
    imageUrl: f.image_url,
  }));
}



export const saveRecipe = async (recipe: Recipe): Promise<void> => {
  await api.post('/favorites', {
    recipe_id: recipe.id,
    name: recipe.name,
    instructions: recipe.instructions,
    image_url: recipe.imageUrl,
  });
};



export const removeFavorite = async (favoriteId: string): Promise<void> => {
  await api.delete(`/favorites/${favoriteId}`);
};



export const removeRecipe = async (id: string): Promise<void> => {
  await api.delete(`/recipes/${id}`);
};
