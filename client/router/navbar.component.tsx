import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store/store';
import styles from '../global-styles';
import { thunkGetSongs } from '../store/thunks';

function NavBarComponent() {
	const nav = useNavigation();
	const user = useSelector((state: AppState) => state.user);
	const dispatch = useDispatch();
	return (
		<View style={{ flex: 1, flexDirection: 'row' }}>
			{user.role === 'employee' ? (
				<Button onPress={() => nav.navigate('EditUser')} title="Manage Users" />
			) : (
				<></>
			)}
			<Button
				onPress={() => {
					dispatch(thunkGetSongs);
					nav.navigate('Home');
				}}
				title="Songs"
			/>
		</View>
	);
}

export default NavBarComponent;
