import React from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store/store';
import styles from '../global-styles';
import userService from '../user/user.service';

function NavBarComponent() {
	const nav = useNavigation();
	const user = useSelector((state: AppState) => state.user);
	const dispatch = useDispatch();
	return (
		<View style={styles.row}>
			{user.role === 'employee' ? (
				<Button onPress={() => nav.navigate('EditUser')} title="Manage Users" />
			) : (
				<></>
			)} 
			{ user.role ? (
			
				<Button   onPress={() => {   nav.navigate('Home');
					}}   title="Songs"   />
				) : 
				(
					<View> {user.role} </View> 
				)
			}
		
		</View>
	);
}

export default NavBarComponent;
