import { Stack } from 'expo-router';
import BottomNavBar from '../components/BottomNavBar';
import { View } from 'react-native';


export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      <BottomNavBar />
    </View>
  );
}
