import React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import userService from './user.service';
import style from '../global-styles';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../store/store';
import { addUser } from '../store/actions';

function AddDeleteUserComponent(username: string) {
	const userSelector = (state: UserState) => state.userInput;
	const user = useSelector(userSelector);
	const dispatch = useDispatch();

	const AddForm = () => {
		Alert.alert('add user');
		return (
			<View>
				<Text>Username: </Text>
				<TextInput
					style={style.input}
					onChangeText={(value) =>
						dispatch(addUser({ ...user, username: value }))
					}
					value={user.username}
				/>
				<Text>Password: </Text>
				<TextInput
					secureTextEntry={true}
					style={style.input}
					onChangeText={(value) =>
						dispatch(addUser({ ...user, password: value }))
					}
					value={user.password}
				/>
				<Text>Role: </Text>
				<TextInput
					secureTextEntry={true}
					style={style.input}
					onChangeText={(value) => dispatch(addUser({ ...user, role: value }))}
					value={user.role}
				/>
			</View>
		);
	};

	const handleDelete = () => {
		userService.deleteByUsername(user.username).then(() => {});
	};

	return (
		<View>
			<Text>Username: </Text>
			<TextInput
				style={style.input}
				onChangeText={(value: any) =>
					dispatch(addUser({ ...user, username: value }))
				}
				value={user.username}
			/>
			<Text>Password: </Text>
			<TextInput
				secureTextEntry={true}
				style={style.input}
				onChangeText={(value: any) =>
					dispatch(addUser({ ...user, password: value }))
				}
				value={user.password}
			/>
			<Text>Role: </Text>
			<TextInput
				style={style.input}
				onChangeText={(value) => 
					dispatch(addUser({ ...user, role: value }))}
				value={user.role}
			/>

			<Button onPress={handleDelete} title="Delete User" color="#880022" />
			<Button onPress={AddForm} title="Add User" color="#880022" />
		</View>
	);
}
export default AddDeleteUserComponent;
