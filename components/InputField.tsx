import { View, TextInput, StyleSheet } from 'react-native';

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
}

export default function InputField({ placeholder, value, onChangeText, multiline = false }: InputFieldProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
});
