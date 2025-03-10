import { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { api } from '../utils/api';
import { useRouter } from 'expo-router';

export default function AddRecipeScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSave = async () => {
    if (!name || !instructions) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      await api.post('/recipes', {
        name,
        instructions,
        image_url: imageUrl || 'https://via.placeholder.com/150',
      });
      Alert.alert('Sucesso', 'Receita adicionada!');
      setName('');
      setInstructions('');
      setImageUrl('');
      router.push('/'); // Voltar para a Home
    } catch (error) {
      console.error('Erro ao adicionar receita:', error);
      Alert.alert('Erro', 'Não foi possível adicionar a receita');
    }
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-xl font-bold mb-4">Adicionar Receita</Text>
      <TextInput className="bg-white p-3 rounded mb-2" placeholder="Nome da Receita" value={name} onChangeText={setName} />
      <TextInput className="bg-white p-3 rounded mb-2" placeholder="Instruções" value={instructions} onChangeText={setInstructions} multiline />
      <TextInput className="bg-white p-3 rounded mb-2" placeholder="URL da Imagem (opcional)" value={imageUrl} onChangeText={setImageUrl} />
      <Button title="Salvar Receita" onPress={handleSave} />
    </View>
  );
}
    