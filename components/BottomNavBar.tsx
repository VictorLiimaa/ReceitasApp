import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';


export default function BottomNavBar() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/')} style={styles.navItem}>
        <FontAwesome5 name="home" size={24} color="#000000" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/favorites')} style={styles.navItem}>
        <FontAwesome5 name="star" size={24} color="#000000" />
        <Text style={styles.navText}>Favoritos</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/add-recipe')} style={styles.navItem}>
        <FontAwesome5 name="plus" size={24} color="#000000" />
        <Text style={styles.navText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#B3E5FC', 
    borderTopWidth: 1,
    borderTopColor: '#000000', 
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 50,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 12,
    color: '#000000',
  },
});
