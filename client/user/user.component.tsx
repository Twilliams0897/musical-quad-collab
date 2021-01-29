import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { GrubState } from '../store/store';
import styles from '../global-styles';
import LoginComponent from './login.component';
import { MyScreen } from '../screens/my.screen';
import AddEmp from './add_emp.component';



function UserComponent() {
    const nav = useNavigation();
    const user = useSelector((state: GrubState) => state.user);
    return (
        <View style={styles.row}>
            Something needs to be put here so I know what's going on.
        </View>
    )
}

export default UserComponent;