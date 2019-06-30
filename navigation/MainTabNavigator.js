import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import CameraScreen from '../screens/CameraScreen';

const config = Platform.select({
	web: { headerMode: 'screen' },
	default: {}
});

const HomeStack = createStackNavigator(
	{
		Home: HomeScreen
	},
	config
);

HomeStack.navigationOptions = {
	tabBarLabel: 'Home',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-information-circle'
			}
		/>
	)
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
	{
		Links: LinksScreen
	},
	config
);

LinksStack.navigationOptions = {
	tabBarLabel: 'Links',
	tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
};

LinksStack.path = '';

const LeapStack = createStackNavigator(
	{
		Leap: CameraScreen
	},
	config
);

LeapStack.navigationOptions = {
	tabBarLabel: 'Leap',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
	)
};

LeapStack.path = '';

const tabNavigator = createBottomTabNavigator({
	HomeStack,
	LinksStack,
	LeapStack
});

tabNavigator.path = '';

export default tabNavigator;
