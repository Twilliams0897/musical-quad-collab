import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import store from './store/store';
import RouterComponent from './router/router.component';
import userService from './user/user.service';
import { getUser } from './store/actions';

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<RouterComponent></RouterComponent>
			</NavigationContainer>
		</Provider>
	);
}
