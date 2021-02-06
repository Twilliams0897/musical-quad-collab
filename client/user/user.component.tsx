import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AppState } from '../store/store';
import styles from '../global-styles';
import LoginComponent from './login.component';



function UserComponent() {
    const nav = useNavigation();
    const user = useSelector((state: AppState) => state.user);
    return (
        <View style={styles.row}>
            Something needs to be put here so I know what's going on.
        </View>
    )
}

export default UserComponent;