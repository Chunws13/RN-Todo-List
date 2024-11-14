import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MemoScreen from "../screens/MemoScreen";
import BucketList from "../screens/Bucket";

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
            <Tab.Screen name='Memo' component={MemoScreen}
                options={{headerShown: false, tabBarLabel: "메모"}}/>

            <Tab.Screen name='BucketList' component={BucketList}
                options={{headerShown: false, tabBarLabel: "버킷리스트"}}/>
        </Tab.Navigator>
    )
}

export default TabNavigator;