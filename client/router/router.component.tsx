import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from '../user/login.component';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import NavBarComponent from './navbar.component';
import SongDetailComponent from '../song/song.detail.component';
import TableComponent from '../song/table.component';
import RemoveUserComponent from '../user/addRemoveUser.component';
import { Song } from '../song/song';
import { GrubState } from '../store/store';
import { useSelector } from 'react-redux';
import { State } from 'react-native-gesture-handler';
import { User } from '../user/user';


/* Parameter list for RouteProp requires a field for the route that we're on. */
export type StackParams = {
    Login: undefined;
    GetUsers: undefined;
    SongDetail: Song;
    Songs: undefined;
    EditUser: undefined;

};

const Stack = createStackNavigator<StackParams>();
const headerOptions: StackHeaderOptions = {
    headerTitle: () => <Text>Musical Quad Collab</Text>,
    headerRight: () => <NavBarComponent />,
};
function RouterComponent(props: any) {
    const song = useSelector((state: GrubState) => state.song);
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen
                name='Login'
                component={LoginComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='SongDetail'
                component={SongDetailComponent}
                options={headerOptions}
                initialParams = { song }
            />
            <Stack.Screen
            name='Songs'
            component={TableComponent}
            options={headerOptions}
            />
            <Stack.Screen
            name='EditUser'
            component={RemoveUserComponent}
            options={headerOptions}
            />
        </Stack.Navigator>
    );
}

export default RouterComponent;
