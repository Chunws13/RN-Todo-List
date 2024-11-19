import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeSreen from "../screens/HomeScreen";
import MemoScreen from "../screens/MemoScreen";
import BucketList from "../screens/BucketList";

import Entypo from '@expo/vector-icons/Entypo';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: 'black',
                    borderTopWidth: 0,
                    elevation: 0, // 안드로이드 그림자 제거
                    shadowOpacity: 0, // iOS 그림자 제거
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#4F4F4F',
            }}>
            <Tab.Screen name='Home' component={HomeSreen}
                options={{headerShown: false, tabBarLabel: "홈", 
                    tabBarIcon: ({color, size}) => ( 
                        <Entypo name="home" size={30} color={color}/>
                    )
                }}/>
            
            <Tab.Screen name='Memo' component={MemoScreen}
                options={{headerShown: false, tabBarLabel: "메모",
                    tabBarIcon: ({color, size}) => (
                        <Entypo name="calendar" size={30} color={color}/>
                    )
                }}/>

            <Tab.Screen name='BucketList' component={BucketList}
                options={{headerShown: false, tabBarLabel: "버킷리스트",
                    tabBarIcon: ({color, size}) => (
                        <Entypo name="heart" size={30} color={color}/>
                    )
                }}/>
        </Tab.Navigator>
    )
}

export default TabNavigator;