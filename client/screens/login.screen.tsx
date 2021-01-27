import React, { useEffect } from 'react';
//import {Text, View} from 'react-native';
import {UserState} from '../store/store';
import {getUser, loginAction} from '../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import userService from '../user/user.service';
import {Platform, Button, TextInput, Text, View, TouchableNativeFeedback, TouchableHighlight} from 'react-native';
import style from '../global-styles';

interface LoginProp {
    navigation: any;
}

function LoginScreen({navigation}: LoginProp){
    const userSelector = (state: UserState) => state.loginUser;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        //Validate whether we are logged in already
        userService
            .getLogin()
            .then((loggedUser) => {
                dispatch(getUser(loggedUser));
                navigation.navigate('HomeScreen');
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    function submitForm() {
        userService.login(user).then((user) => {
            console.log(user);
            dispatch(getUser(user));
            navigation.navigate('HomeScreen');
        });
    }

    function handle(){
        alert('Why?');
    }

    function longHandle(){
        alert('Long Press');
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
            <Text>{Platform.OS}</Text>
            {Platform.OS === 'android' ? (
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackground()}
                >
                    <View>
                        <Text>OnlyAndroid</Text>
                    </View>
                </TouchableNativeFeedback>
            ) : (
                <TouchableHighlight onPress={handle} underlayColor='white'>
                    <View>
                        <Text>Everyone Else</Text>
                    </View>
                </TouchableHighlight>
            )}
            <TouchableHighlight onLongPress={longHandle} underlayColor='white'>
                <View>
                    <Text>Everyone Else</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}
export default LoginScreen;
/*
export const  LoginScreen = () => {
    //check to see if we are logged in, if we are redirect to home screen
    
    return (
        <View>
             <Text> I am Login Screen </Text>
        </View>
    )
}
*/