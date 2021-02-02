import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from '../user/login.component';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import NavBarComponent from './navbar.component';
import AddDeleteUserComponent from '../user/add.delete.component';
import { Song } from '../song/song';
import HomeScreen from '../screens/home.screen';

/* Parameter list for RouteProp requires a field for the route that we're on. */
export type StackParams = {
	Login: undefined;
	GetUsers: undefined;
	SongDetail: Song;
	Songs: undefined;
	EditUser: undefined;
	Home: undefined;
};

const Stack = createStackNavigator<StackParams>();
const headerOptions: StackHeaderOptions = {
	headerTitle: () => <Text>Musical Quad Collab</Text>,
	headerRight: () => <NavBarComponent />,
};
function RouterComponent() {
	return (
		<Stack.Navigator initialRouteName="Login">
			<Stack.Screen
				name="Login"
				component={LoginComponent}
				options={headerOptions}
			/>
			<Stack.Screen
				name="EditUser"
				component={AddDeleteUserComponent}
				options={headerOptions}
			/>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={headerOptions}
			/>
		</Stack.Navigator>
	);
}

export default RouterComponent;
