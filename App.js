import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import dbManger from "./utils/DbManger";

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
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator/>
        <BannerAd
          unitId={TestIds.BANNER}
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