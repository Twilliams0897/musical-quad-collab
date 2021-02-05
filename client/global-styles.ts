import { StyleSheet } from 'react-native';

const { create } = require('react-native-pixel-perfect');
//import {create} from 'react-native-pixel-perfect';

const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

const styles = StyleSheet.create({
	header: {
		textAlign: 'center',
		backgroundColor: '#4BA3C3',
		borderBottomColor: '#4BA3C3',
		borderStyle: 'solid',
		borderBottomWidth: 1,
		color: '#4d243d',
		padding: 10,
		width: '100%',
		height: 'fit-content',
		fontSize: 24,
		fontWeight: '700',
	},
	input: {
		backgroundColor: '#b3ffb3',
		height: 40,
		width: 300,
		margin: 10,
	},
	label: {
		color: '#b3ffb3',
		lineHeight: 40,
		height: 40,
		fontSize: 20,
	},
	container: {
		color: '#b3ffb3',
		backgroundColor: '#0F4C5C',
		alignItems: 'center',
		fontSize: 16,
		fontWeight: '400',
		width: '100%',
		height: '100%',
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		margin: 40,
	},
	url: {
		color: '#fef9ff',
	},
});

export default styles;
