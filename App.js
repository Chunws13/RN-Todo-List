import React, { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import * as SplashScreen from 'expo-splash-screen';
import AdSetting from "./utils/AdSetting";
import dbManger from "./utils/DbManger";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const bucketColumns = [
		{name: 'content', type: 'TEXT'},
		{name: 'do', type: 'INTEGER'},
		{name: 'status', type: 'INTEGER'},
	]

  const memoColumns = [
    {name: 'targetDate', type: 'TEXT'}, 
    {name: 'memo', type: 'TEXT'}, 
    {name: 'complete', type: 'INTEGER'}
  ]

  useEffect(() => {
    const createBucketeDB = async() => {
			await dbManger.createTable('bucketList', bucketColumns);
		};

    const createMemoDB = async() => {
			await dbManger.createTable('memos', memoColumns);
		};

    createBucketeDB();
    createMemoDB();
    
    SplashScreen.hideAsync();
  });
  const adId = AdSetting();
  return (
    <SafeAreaProvider>
      <StatusBar style="black" translucent={false} />
      <NavigationContainer>
        <TabNavigator/>
        <BannerAd
          unitId={adId}
          size = {BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App;