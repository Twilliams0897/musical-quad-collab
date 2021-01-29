import React, { useEffect } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import {useDispatch, useSelector } from 'react-redux';
//import {useHistory} from 'react-router-dom';
import { getUser, loginAction } from '../store/actions';
import { Button, TextInput, Text, View } from 'react-native';
import style from '../global-styles';
<<<<<<< Updated upstream
import { User } from './user';
=======
import {User} from './user';
>>>>>>> Stashed changes

// Function Component
interface LoginProp {
    navigation: any
}
function LoginComponent({navigation}: LoginProp) {
    const userSelector = (state: UserState) => state.loginUser;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        // Check to see if we're already logged in. Redirect if we are.
        userService.getLogin().then((loggedUser)=>{
            dispatch(getUser(loggedUser));
            console.log(loggedUser.role, 'logged');
            navigation.navigate('Songs');
        }).catch((err)=>{
            console.error(err);
        });
    }, []);

    function submitForm() {
        userService.login(user).then((user) => {
            console.log(user);
<<<<<<< Updated upstream
            /*
                When logged in, a new user with the same credentials is created. 
                That way, when we click the back to the home page, the previous user is no longer logged in.
            */
=======
>>>>>>> Stashed changes
            let newUser = new User();
            newUser.username = user.username;
            newUser.password = user.password;
            newUser.role = user.role;
            dispatch(getUser(newUser));
<<<<<<< Updated upstream
            navigation.navigate('Songs');  
=======
            navigation.navigate('Songs');  //*
>>>>>>> Stashed changes
        });      
         
    }
    return (
        <View style={[style.container, style.login]}>
            
            <Text>Username: </Text>
            <TextInput
                style={style.input}
                onChangeText={(value: any) =>
                    dispatch(loginAction({ ...user, username: value }))
                }
                value={user.username}
            />
            <Text>Password: </Text>
            <TextInput
                secureTextEntry={true}
                style={style.input}
                onChangeText={(value: any) =>
                    dispatch(loginAction({ ...user, password: value }))
                }
                value={user.password}
            />
            <Button onPress={submitForm} title='Login' color='#880022' />
        </View>
    );
}

export default LoginComponent;
