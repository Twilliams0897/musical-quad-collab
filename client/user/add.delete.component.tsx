import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import userService from './user.service';
import style from '../global-styles';
import { User } from './user';
import styles from '../global-styles';

function AddDeleteUserComponent(username: string) {
	let [value, setValue] = useState('');
	const AddForm = () => {
		Alert.alert('add user');
		return (
			<View>
				{' '}
				<Text> add user</Text>
			</View>
		);
	};

	const handleDelete = () => {
		userService.deleteByUsername(value).then(() => {});
	};

	return (
		<View  style={ styles.input}>
			<TextInput 
				placeholder="add /remove username"
				value={value}
				onChangeText={(value) => setValue(value)}
			/>
		
			<Button onPress={handleDelete} title="Delete" color="#880022"   />
			<Button onPress={AddForm} title="Add" color="#880022" />
		</View>
	);
}
export default AddDeleteUserComponent;
