import React, { useEffect } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import {useDispatch, useSelector } from 'react-redux';
//import {useHistory} from 'react-router-dom';
import { getUser, loginAction } from '../store/actions';
import { Button, TextInput, Text, View } from 'react-native';
import style from '../global-styles';
import { User } from './user';

// Function Component
interface LoginProp {
    navigation: any
}
function LoginComponent({navigation}: LoginProp) {
    const userSelector = (state: UserState) => state.loginUser;
    const user = useSelector(userSelector);
    // const actualUser = useSelector((state: UserState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        // Check to see if we're already logged in. Redirect if we are.
        userService.getLogin().then((loggedUser)=>{
            dispatch(getUser(loggedUser));
            navigation.navigate('SongComponent')

        }).catch((err)=>{
            console.error(err);
        });
    }, []);

    function submitForm() {
        userService.login(user).then((user) => {
            console.log(user);
            let newUser = new User();
            newUser.username = user.username;
            newUser.password = user.password;
            newUser.role = user.role;
            dispatch(getUser(newUser));
            navigation.navigate('SongComponent');
        });

    }
    return (
        <View style={[style.container, style.login]}>
            <Text>Username: </Text>
            <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(loginAction({ ...user, username: value }))
                }
                value={user.username}
            />
            <Text>Password: </Text>
            <TextInput
                secureTextEntry={true}
                style={style.input}
                onChangeText={(value) =>
                    dispatch(loginAction({ ...user, password: value }))
                }
                value={user.password}
            />
            <Button onPress={submitForm} title='Login' color='#880022' />
        </View>
    );
}

export default LoginComponent;
