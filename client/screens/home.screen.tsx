import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetSongs } from '../store/thunks';
import { SongState } from '../store/store';
import SongComponent from '../song/song.component';
import styles from '../global-styles';
import PlayerComponent from '../song/player.component';
import { TextInput } from 'react-native-gesture-handler';
import songService from '../song/song.service';
import { getSongs } from '../store/actions';

interface Search {
	query?: string;
	searchType?: string | null;
	text?: string;
	search?: string;
}

const HomeScreen = () => {
	const [query, setQuery] = useState('');
	const [searchType, setSearch] = useState(null);
	const selectSongs = (state: SongState) => state.songlist;
	const songs = useSelector(selectSongs);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(thunkGetSongs());
	}, []);

	const handleSearch = () => {
		let search: any = {};
		search[searchType as any] = query;
		songService
			.searchSongs(search)
			.then((res) => dispatch(getSongs(res)))
			.catch((err) => console.log(err.stack));
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Welcome to Music Mania</Text>
			<View style={styles.row}>
				<Text style={styles.label}>Search </Text>
				<TextInput
					style={styles.input}
					placeholder="Enter an artist or song title"
					onChangeText={(text) => setQuery(text)}
					value={query}
				/>
				<Text> </Text>
				<DropDownPicker
					items={[
						{
							label: 'Artist',
							value: 'artist',
						},
						{
							label: 'Title',
							value: 'title',
						},
					]}
					defaultValue={searchType}
					placeholder="Select an type"
					containerStyle={{
						height: 40,
						borderColor: '#4BA3C3',
						borderWidth: 1,
						borderStyle: 'solid',
						borderRadius: 5,
					}}
					style={{
						backgroundColor: '#4BA3C3',
						zIndex: 99,
					}}
					itemStyle={{
						justifyContent: 'flex-start',
						zIndex: 1,
					}}
					labelStyle={{
						fontSize: 14,
						textAlign: 'center',
						color: '#4d243d',
					}}
					selectedLabelStyle={{
						color: '#fef9ff',
					}}
					dropDownStyle={{ backgroundColor: '#4BA3C3' }}
					onChangeItem={(item) => setSearch(item.value)}
				/>
				<Text> </Text>
				<Pressable onPress={() => handleSearch()}>
					<Image
						style={{
							height: 40,
							width: 40,
							backgroundColor: 'rgb(0, 151, 240)',
							borderRadius: 5,
						}}
						source={require('../assets/search_icon.png')}
					/>
				</Pressable>
			</View>
			<PlayerComponent />
			{songs && songs.length ? (
				<FlatList
					data={songs}
					renderItem={({ item }) => <SongComponent data={item}></SongComponent>}
					keyExtractor={(item) => `${item.song_id}`}
				/>
			) : (
				<Text>Loading</Text>
			)}
		</View>
	);
};

export default HomeScreen;
