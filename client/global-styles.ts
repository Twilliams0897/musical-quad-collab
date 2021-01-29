import {StyleSheet} from 'react-native';
const purple= '#9900ff';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#880022',
        borderStyle: 'solid',
        borderWidth: 3,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 4
    },
    login: {
        backgroundColor: '#009999'
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    }
});

export default styles;