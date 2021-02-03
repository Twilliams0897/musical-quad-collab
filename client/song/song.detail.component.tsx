import React from 'react';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, Button } from 'react-native';
import songService from './song.service';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { changeSong } from '../store/actions';
import { Song } from './song';
import { StackParams } from '../router/router.component';
import styles from '../global-styles';
import { thunkGetSongs } from '../store/thunks';
import images from '../images';

interface Props {
    route: RouteProp<StackParams, 'SongDetail'>;
}
export default function SongDetailComponent(props: Props) {
    const nav = useNavigation();
    // Utilize redux to retrieve the value
    //const restaurantSelector = (state: RestaurantState) => state.restaurant;
    //const rest = useSelector(restaurantSelector);
    const userContext = useSelector((state: UserState) => state.user);
    const dispatch = useDispatch();

    // retrieve the value from the navigator.
    const song = props.route.params;

    function handleDelete() {
        songService.deleteSong(song.song_id).then(() => {
            dispatch(changeSong(new Song()));
            dispatch(thunkGetSongs());
            nav.navigate('Songs');
        });
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: images[song.artist.length % 10]  }}></Image> 
            <Text testID='song-id'>{song.song_id}</Text>
            <Text>{song.title}</Text>
            <Text>{song.artist}</Text>
            <Text>{song.year}</Text>
            <Text>{song.price}</Text>
           
            {userContext.role === 'employee' && (
                <>
                    <Button onPress={handleDelete} title='Delete Song' />
                </>
            )}
        </View>
    );
}

