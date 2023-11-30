import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  MovieDetailsScreen,
  PersonDetailsScreen,
  SearchScreen,
  RootStackParamList,
} from "@/screens";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-get-random-values";

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen
              name="MovieDetailsScreen"
              component={MovieDetailsScreen}
            />
            <Stack.Screen
              name="PersonDetailsScreen"
              component={PersonDetailsScreen}
            />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
          </Stack.Navigator>
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
