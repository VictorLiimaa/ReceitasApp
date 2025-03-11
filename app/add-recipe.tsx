import { useState } from 'react';
import { View, TextInput, Button, Alert, Text, SafeAreaView } from 'react-native';
import { api } from '../utils/api';
import { useRouter } from 'expo-router';


export default function AddRecipeScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSave = async () => {
    if (!name || !instructions) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const response = await api.post('/recipes', {
        name,
        instructions,
        image_url: imageUrl || 'https://picsum.photos/seed/default/300/200',
      });
      if (response.data) {
        Alert.alert('Sucesso', 'Receita adicionada!');
      }
      setName('');
      setInstructions('');
      setImageUrl('');
      router.push('/');
    } catch (error) {
      console.error('Erro ao adicionar receita:', error);
      Alert.alert('Erro', 'Não foi possível adicionar a receita');
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: '#FFFFFF', paddingBottom: 80 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Adicionar Receita</Text>
      <TextInput
        style={{
          backgroundColor: '#F0F0F0',
          padding: 12,
          borderRadius: 8,
          marginBottom: 8,
        }}
        placeholder="Nome da Receita"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={{
          backgroundColor: '#F0F0F0',
          padding: 12,
          borderRadius: 8,
          marginBottom: 8,
          height: 80,
          textAlignVertical: 'top',
        }}
        placeholder="Instruções"
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />
      <TextInput
        style={{
          backgroundColor: '#F0F0F0',
          padding: 12,
          borderRadius: 8,
          marginBottom: 8,
        }}
        placeholder="URL da Imagem (opcional)"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <Button title="Salvar Receita" onPress={handleSave} />
    </SafeAreaView>
  );

}
