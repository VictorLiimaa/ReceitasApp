import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function BottomNavBar() {
  const router = useRouter();

  return (
    <View className="flex-row justify-around items-center bg-gray-100 py-3 border-t border-gray-300 absolute bottom-0 w-full">
      <TouchableOpacity onPress={() => router.push('/')} className="items-center flex-1">
        <FontAwesome5 name="home" size={24} color="black" />
        <Text className="text-sm">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/favorites')} className="items-center flex-1">
        <FontAwesome5 name="star" size={24} color="black" />
        <Text className="text-sm">Favoritos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/add-recipe')} className="items-center flex-1">
        <FontAwesome5 name="plus" size={24} color="black" />
        <Text className="text-sm">Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}
