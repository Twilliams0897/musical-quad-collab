import React, {useState, useEffect } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
//import {useHistory} from 'react-router-dom';
import { getUser, loginAction } from '../store/actions';
import { Button, TextInput, Text, View } from 'react-native';
import style from '../global-styles';
import {addUser} from '../store/actions';

interface RegisterProp{
    navigation: any;
}
function RegisterComponent({navigation}:RegisterProp) {
    let [value, setValue] = useState('');
	const userSelector = (state: UserState) => state.userInput;
	const user = useSelector(userSelector);
	const dispatch = useDispatch();

	const registrationForm = () => {
        user.role = 'customer';
        navigation.navigate('Login');
        console.log(user);
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
            </View>
        );
	}

	return (
		<View style={style.container}>
			<Text style={style.label}>Username: </Text>
			<TextInput
				style={style.input}
				onChangeText={(value: any) =>
					dispatch(addUser({ ...user, username: value }))
				}
				value={user.username}
			/>
			<Text style={style.label}>Password: </Text>
			<TextInput
				secureTextEntry={true}
				style={style.input}
				onChangeText={(value: any) =>
					dispatch(addUser({ ...user, password: value }))
				}
				value={user.password}
			/>
			<Button onPress={registrationForm} title="Submit" />
		</View>
	);
}

export default RegisterComponent;
