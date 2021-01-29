import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { GrubState } from '../store/store';
import styles from '../global-styles';
import LoginComponent from '../user/login.component';
import { MyScreen } from '../screens/my.screen';
import SongComponent from '../song/song.component';

function NavBarComponent() {
    const nav = useNavigation();
    const user = useSelector((state: GrubState) => state.user);
    return (
        <View style={styles.row}>
        {user.username && <Text>Welcome {user.username} </Text>}
        {user.role === 'Employee' && <Button onPress={()=> {nav.navigate('DELETE-USER')}} title='Delete User'/>}
        <Button onPress={()=> {nav.navigate('SongComponent')}} title='Playlist'/>
        </View>
    )
}

export default NavBarComponent;