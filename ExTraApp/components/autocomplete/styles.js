import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    componentContainer: {
        position: 'relative',
        zIndex: 1,
    },

    inputContainer: {},

    resultsContainer: {
        position: 'relative',
        height: 0,
        zIndex: 2,
    },

    resultItemsContainer: {
        display: 'flex',
        flexDirection: 'column',

        // backgroundColor: '#ff0000',

        position: 'absolute',
    },

    itemContainer: {
        display: 'flex',
        flexDirection: 'row',

        height: 40,
        width: '100%',
        backgroundColor: '#eaeaea',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#696969'
    },

    itemText: {
        fontSize: 17,
    },
});

export default styles;
