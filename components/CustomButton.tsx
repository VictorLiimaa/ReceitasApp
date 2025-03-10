import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
}

export default function CustomButton({ title, onPress, color = '#4CAF50' }: CustomButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
