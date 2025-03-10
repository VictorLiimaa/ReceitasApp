import { TextInput, View } from 'react-native';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  return (
    <View className="flex-row bg-gray-100 p-2 rounded-lg">
      <TextInput
        className="flex-1 p-2"
        placeholder="Pesquisar receitas..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => onSearch(query)}
      />
    </View>
  );
}