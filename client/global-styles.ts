import { StyleSheet } from 'react-native';

const { create } = require('react-native-pixel-perfect');
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
		width: perfectSize(1125),
		height: 'fit-content',
		fontSize: 24,
		fontWeight: '700',
	},
	container: {
		color: '#b3ffb3',
		backgroundColor: '#0F4C5C',
		alignItems: 'center',
		fontSize: 16,
		fontWeight: '400',
	},
	row: {
		flex: 1,
		flexDirection: 'row',
	},
	url: {
		color: '#fef9ff',
	},
});

export default styles;
