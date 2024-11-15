import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeSreen from "../screens/HomeScreen";
import MemoScreen from "../screens/MemoScreen";
import BucketList from "../screens/Bucket";

import Entypo from '@expo/vector-icons/Entypo';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: 'red'
                },
                tabBarActiveBackgroundColor: 'blue',
                tabBarInactiveBackgroundColor: 'black',
                tabBarLabelStyle : {
                    fontSize: 12,
                }
            }}>
            <Tab.Screen name='Home' component={HomeSreen}
                options={{headerShown: false, tabBarLabel: "홈", 
                    tabBarIcon: ({color, size}) => ( 
                        <Entypo name="home" size={size} color={color}/>
                    )
                }}/>
            
            <Tab.Screen name='Memo' component={MemoScreen}
                options={{headerShown: false, tabBarLabel: "메모",
                    tabBarIcon: ({color, size}) => (
                        <Entypo name="calendar" size={size} color={color}/>
                    )
                }}/>

            <Tab.Screen name='BucketList' component={BucketList}
                options={{headerShown: false, tabBarLabel: "버킷리스트",
                    tabBarIcon: ({color, size}) => (
                        <Entypo name="heart" size={size} color={color}/>
                    )
                }}/>
        </Tab.Navigator>
    )
}

export default TabNavigator;