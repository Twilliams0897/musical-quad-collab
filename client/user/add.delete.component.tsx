import React, { useEffect } from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import userService from './user.service';
import style from '../global-styles';
import { useNavigation } from '@react-navigation/native';

const nav = useNavigation();
function addForm(){

};

function deleteForm(){
    
}

function AddDeleteUserComponent(username: string){

    userService.deleteByUsername(username);
    nav.navigate('Songs');

    return (
        <View style={[style.container, style.login]}>
            <Text> Username: </Text>
            <TextInput />
            <Button onPress={deleteForm} title='Delete' color='#880022' />
            <Button onPress ={addForm} title='Add' color='#880022' />
        </View>
    );

}
export default AddDeleteUserComponent;

