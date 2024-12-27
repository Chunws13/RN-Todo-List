import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import * as SplashScreen from 'expo-splash-screen';
import AdSetting from "./utils/AdSetting";
import dbManger from "./utils/DbManger";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

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
    const prepareApp = async () => {
      try {
        // 스플래시 화면 유지
        await SplashScreen.preventAutoHideAsync();

        // 비동기 작업 수행
        await dbManger.createTable('bucketList', bucketColumns);
        await dbManger.createTable('memos', memoColumns);
      } catch (e) {
        console.warn(e);
      } finally {
        // 앱 준비 완료 상태 설정
        setIsAppReady(true);
      }
    };

    prepareApp();
  }, []);

  const onLayoutRootView = async () => {
    if (isAppReady) {
      // 앱이 준비되었으면 스플래시 화면 숨김
      await SplashScreen.hideAsync();
    }
  };

  if (!isAppReady) {
    return null; // 앱이 준비되지 않았을 때는 아무것도 렌더링하지 않음
  }

  const adId = AdSetting();
  return (
    <SafeAreaProvider>
      <View style={{flex: 1}} onLayout={onLayoutRootView}>
        <StatusBar style="light" hidden={false} translucent={false} />
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
      </View>
    </SafeAreaProvider>
  )
}

export default App;