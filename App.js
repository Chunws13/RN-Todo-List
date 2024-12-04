import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AdMobBanner } from "expo-ads-admob";

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        
        <TabNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App;