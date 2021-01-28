import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { GrubState } from '../store/store';
import styles from '../global-styles';


function NavBarComponent() {
    const nav = useNavigation();
    const user = useSelector((state: GrubState) => state.user);
    const dispatch = useDispatch();
    return (
        <View style={styles.row}>
        {user.username && <Text>Welcome {user.username} </Text>}
        {user.role === 'employee' ? (
          <Button onPress={()=> {
             nav.navigate('AddSong');
          }} 
          title={`Welcome ${user.username}`  }
          />
        ) : (
          <></>
        )}
        <Button onPress={()=> {nav.navigate('Songs'); }} title='Songs'/>
      </View>
    );
}

export default NavBarComponent;