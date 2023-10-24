import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    // Top Section

    topSection: {
        height: 40,
        backgroundColor: '#d9d9d9',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 20,
    },

    topSectionTitle: {
        fontSize: 30,
        marginLeft: 10,
    },




    // Middle Section

    middleSection: {
        marginVertical: 10,
        paddingVertical: 15,
    },

    categoryFilterContainer: {
        position: 'relative',
        height: 100,
        zIndex: 1
    },

    categoryTitleContainer: {

    },

    categoryTitle: {
        fontSize: 17,
    },

    autocompleteContainer: {
        position: 'absolute',
        width: 300,
        zIndex: 2
    },

    dateButtonContainer: {
        marginHorizontal: '4%',
        marginTop: 10
    },




    // Bottom section

    bottomSection: {
        marginTop: 50,
    },
});

export default styles;
