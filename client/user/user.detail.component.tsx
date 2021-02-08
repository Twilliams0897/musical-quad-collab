import React from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { useHistory } from 'react-router-dom';
import userService from './user.service';
import { changeUser, getAllUsers, getUser} from '../store/actions';
import { UserState } from '../store/store';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { User } from "./user";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../global-styles";
import { StackParams } from "../router/router.component";
import {thunkGetUsers} from "../store/thunks";
import UserComponent from "./user.component";


function ViewAllUsersComponent() {
    const selectUsers = (state: UserState) => state.users;
	const users = useSelector(selectUsers);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(thunkGetUsers());
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Welcome to Music Mania</Text>
			{users && users.length ? (
				<FlatList
					data={users}
					renderItem={({ item }) => <UserComponent data={item}></UserComponent>}
					keyExtractor={(item) => `${item.username}`}
				/>
			) : (
				<Text>Loading</Text>
			)}
		</View>
	);
};

const flatstyle = StyleSheet.create({
	container: { alignItems: 'center', width: '100%' },
})

export default ViewAllUsersComponent;

