
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserState } from '../store/store';
import { FlatList } from 'react-native-gesture-handler';
import UserComponent from './user.component';
import { thunkGetUsers } from '../store/thunks';
import { Platform, Text } from 'react-native';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

export default function UserTableComponent(){
    const selectUser = (state: UserState) => state.users;
    const users = useSelector(selectUser);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetUsers());
    }, [dispatch]);

    return (
		<>
			{users && users.length ? (
				<FlatList
					data={users}
					renderItem={({ item }) => <UserComponent data={item}></UserComponent>}
					keyExtractor={(item) => `${item.username}`}
				/>
			) : (
				<Text
					style={{
						fontSize: Platform.OS === 'web' ? perfectSize(24) : perfectSize(48),
						color: '#b3ffb3',
					}}
				>
					List of Users...? 
				</Text>
			)}
		</>
	);
}