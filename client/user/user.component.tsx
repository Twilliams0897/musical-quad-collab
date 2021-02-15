import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { thunkGetUsers } from '../store/thunks';
import { User } from './user';
import userService from './user.service';

interface UserProps {
	data: User;
}

function UserComponent({ data }: UserProps) {
	const nav = useNavigation();

	//const userContext = useSelector((state: UserState) => state.users);
	const dispatch = useDispatch();

<<<<<<< HEAD
	const goToUser = () => {
		nav.navigate('UserDetails', {
			username: data.username,
            role: data.role,
            playlist: data.playlist,
            favorites: data.favorites,
            bought: data.bought,
            credits: data.credits
		});
	};

    function handleDelete() {
=======
	function handleDelete() {
>>>>>>> 2323c5f5207eb083a4fbee896542a59b13717a2f
		if (data.username) {
			userService.deleteByUsername(data.username).then(() => {
				dispatch(thunkGetUsers());
				nav.navigate('Home');
			});
		}
	}

<<<<<<< HEAD
    return (
        <View >
            <Text>User: {data.username} Role: {data.role} Credits: {data.credits} Favorites: {data.favorites} </Text> 
            <Button title='User Details' onPress={goToUser} />
            <Button title='Delete User' onPress={handleDelete} />
        </View>
    );
=======
	return (
		<View>
			<Text>{data.username}</Text>
			<Text>Role: {data.role}</Text>
			<Text>Credits: {data.credits}</Text>
			<Button title="Delete User" onPress={handleDelete} />
		</View>
	);
>>>>>>> 2323c5f5207eb083a4fbee896542a59b13717a2f
}

export default UserComponent;
