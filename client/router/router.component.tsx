import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from '../user/login.component';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import NavBarComponent from './navbar.component';

import { GrubState } from '../store/store';
import { useSelector } from 'react-redux';
import { MyScreen } from '../screens/my.screen';
import { HomeScreen } from '../screens/home.screen';
import { UserState } from '../store/store';
import { User } from '../user/user';
import SongComponent from '../song/song.component';
/* Parameter list for RouteProp requires a field for the route that we're on. */
export type StackParams = {
    //Login: undefined;
    Login: User;
};

const Stack = createStackNavigator<StackParams>();
const headerOptions: StackHeaderOptions = {
    headerTitle: () => <Text>Musical Quad Maniac</Text>,
    headerRight: () => <NavBarComponent />,
};
function RouterComponent(props: any) {

    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen
                name='Login'
                component={LoginComponent}
                options={headerOptions}
            />
            {SongComponent}
            <Stack.Screen
                name='SongComponent'
                component={SongComponent}
                options={headerOptions}
            />
            <>
                
            </>
         
        </Stack.Navigator>
    );
}

export default RouterComponent;
