import React, { useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch } from 'react-redux';
import styles from '../global-styles';
import TableComponent from '../song/table.component';
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
	const [error, setError] = useState({ message: '' });
	const [query, setQuery] = useState('');
	const [searchType, setSearch] = useState(null);

	const dispatch = useDispatch();

	const handleSearch = () => {
		let search: any = {};
		search[searchType as any] = query;
		songService
			.searchSongs(search)
			.then((res: any) => {
				dispatch(getSongs(res));
				setQuery('');
				setSearch(null);
			})
			.catch((err: any) => setError({ message: err.stack }));
	};

	return (
		<View style={styles.container}>
			{error && error.message !== '' && <Text>error</Text>}
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
						accessibilityLabel="Submit Search"
						source={require('../assets/search_icon.png')}
					/>
				</Pressable>
			</View>
			<PlayerComponent />
			<TableComponent />
		</View>
	);
};

export default HomeScreen;
