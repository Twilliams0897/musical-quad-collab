import React from 'react';
import { Button, Text, View } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { GrubState } from '../store/store';
import styles from '../global-styles';
import LoginComponent from '../user/login.component';
import { MyScreen } from '../screens/my.screen';
import AddEmp from '../user/add_emp.component';

export type StackParams = {
    AddEmp: undefined;
};
const Stack = createStackNavigator<StackParams>();

// function AddEmp(){
//     return (
//         <Stack.Navigator initialRouteName = 'AddEmp'>
//             <Stack.Screen
//                 name ='AddEmp'
//                 component = {addEmp}
//             />
//         </Stack.Navigator>
//     );
// }

function NavBarComponent() {
    const nav = useNavigation();
    const user = useSelector((state: GrubState) => state.user);
    return (
        <View style={styles.row}>
        {user.username && <Text>Welcome {user.username} </Text>}
        {user.role === 'employee' && <Button onPress={()=> {nav.navigate('DELETE-USER')}} title='Delete User'/>}
        <Button onPress={()=> {nav.navigate('MyScreen')}} title='Playlist'/>
        {user.role === 'admin' && <Button onPress={()=> {nav.navigate('AddEmp')}} title='Add Employee'/>}
        </View>
    )
}

export default NavBarComponent;