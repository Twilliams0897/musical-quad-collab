import React from 'react';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import songService from './song.service';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { changeSong } from '../store/actions';
import { Song } from './song';
import { StackParams } from '../router/router.component';
import styles from '../global-styles';
import { thunkGetSongs } from '../store/thunks';
import images from '../images';
import { MaterialIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';


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
    function addToFavorite(){
        return(
            <View>
                <Text>
                    add to favorite
                </Text>
            </View>
        )
    }

    function addToPlayList(){
        return(
            <View>
                <Text>
                    add to Playlist
                </Text> 
                {'userId: ' + userContext.userId}
                {
                'song_id ' + song
                 }
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: images[song.artist.length % 10]  }}></Image> 
            <Text testID='song-id'>id: {song.song_id}</Text>
            <Text>title: {song.title}</Text>
            <Text>artist: {song.artist}</Text>
            <Text>year: {song.year}</Text>
            
            <Text>price: {song.price}</Text>
            <View style={styles.row}>
            <MaterialIcons name="favorite-outline" size={24} color="black" onPress ={
                addToFavorite
            }  style={styles.icon}/>

            <FontAwesome5 name="play" size={24} color="black"  style={styles.icon} />
            <MaterialIcons name="playlist-add" size={24} color="black" />
            {/* <Button onPress={addToPlayList} title='Add to playlist' /> */}
            {userContext.role === 'employee' && (      
             <AntDesign name="delete" size={24} color="black" onPress={handleDelete}/>
            )}
            </View>
            
            

          
        </View>
    );



}
