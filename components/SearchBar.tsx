import { TextInput, View, StyleSheet } from 'react-native';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}


export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar receitas..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => onSearch(query)}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 8,
  },
  input: {
    fontSize: 16,
  },
});
