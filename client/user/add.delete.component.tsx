import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import userService from './user.service';
import style from '../global-styles';
import { User } from './user';
import {useDispatch, useSelector} from 'react-redux';
import { UserState } from '../store/store';
import {getUser} from '../store/actions'

function AddDeleteUserComponent(username: string) {
	let [value, setValue] = useState('');
	const userSelector = (state: UserState) => state.loginUser;
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
						dispatch(userService.addUser({ ...user, username: value }))
					}
					value={user.username}
				/>
				<Text>Password: </Text>
				<TextInput
					secureTextEntry={true}
					style={style.input}
					onChangeText={(value) =>
						dispatch(userService.addUser({ ...user, password: value }))
					}
					value={user.password}
				/>
				<Text>Role: </Text>
				<TextInput
					secureTextEntry={true}
					style={style.input}
					onChangeText={(value) =>
						dispatch(userService.addUser({ ...user, role: value }))
					}
					value={user.role}
				/>
			</View>
		);
	};

	const handleDelete = () => {
		userService.deleteByUsername(value).then(() => {});
	};

	return (
		<View>
			<Text>Username: </Text>
			<TextInput
				style={style.input}
				onChangeText={(value: any) =>
					dispatch(getUser({ ...user, username: value }))
				}
				value={user.username}
			/>
			<Text>Password: </Text>
			<TextInput
				secureTextEntry={true}
				style={style.input}
				onChangeText={(value: any) =>
					dispatch(getUser({ ...user, password: value }))
				}
				value={user.password}
			/>
			<Text>Role: </Text>
			<TextInput
				style={style.input}
				onChangeText={(value) =>
					dispatch(getUser({ ...user, role: value }))
				}
				value={user.role}
			/>

			<Button onPress={handleDelete} title="Delete User" color="#880022" />
			<Button onPress={AddForm} title="Add User" color="#880022" />
		</View>
	);
}
export default AddDeleteUserComponent;
