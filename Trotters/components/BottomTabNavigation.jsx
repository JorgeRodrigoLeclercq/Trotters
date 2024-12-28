import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile, Search, Conversations } from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../resources/index';


const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 70,
        borderTopColor: COLORS.white,
    }
}

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name='Profile' component={Profile}
            options={{
                tabBarIcon: ({focused})=> {
                    return <Ionicons name={focused ? 'person' : 'person-outline'}
                    size={24}
                    color={focused ? COLORS.primary : COLORS.gray}
                    />
                }
            }}
            />

            <Tab.Screen name='Search' component={Search}
            options={{
                tabBarIcon: ({focused})=> {
                    return <Ionicons name={focused ? 'search' : 'search-outline'}
                    size={24}
                    color={focused ? COLORS.primary : COLORS.gray}
                    />
                }
            }}
            />

            <Tab.Screen name='Conversations' component={Conversations}
            options={{
                tabBarIcon: ({focused})=> {
                    return <Ionicons name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
                    size={24}
                    color={focused ? COLORS.primary : COLORS.gray}
                    />
                }
            }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation;