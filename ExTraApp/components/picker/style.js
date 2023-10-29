import { StyleSheet } from "react-native";

const defaultStyles = StyleSheet.create({

    // Selector

    button: {
        backgroundColor: '#E86DC3',
        borderWidth: 1,
        borderColor: 'black',
        paddingBottom: '2.5%',
        paddingTop: '2.5%',
        alignItems: 'center',
        marginTop: 5,
        borderRadius: 10,
    },

    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },

    iconButton: {
        width: 55,
        padding: 10,
        height: 'auto',
        backgroundColor: '#d9d9d9',
    },



    // Modal background

    backgroundView: {

        width: '100%',
        height: '100%',
        backgroundColor: '#d9d9d9',
        opacity: 0.7,
    },

    categoryModalContainer: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',

        height: '50%',
        width: '70%',

        top: '25%',
        left: '15%',

        backgroundColor: '#ffffff',
        borderWidth: 0.5,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        
        elevation: 9,
    },





    // ScrollView Content Container

    scrollviewContainer: {
        display: 'flex',
        flexDirection: 'column',

        height: '75%',
        width: '100%',

    },

    scrollviewStyle: {

        height: 30,

        backgroundColor: '#d9d9d9',
        borderWidth: 0.5,
        borderColor: '#a1a1a1'
    },

    scrollviewIconsStyle: {

        backgroundColor: '#d9d9d9',
        borderWidth: 0.5,
        borderColor: '#a1a1a1'
    },

    scrollviewIconsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',

        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#efefef',
    },

    cancelButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        marginTop: '10%',
        height: '15%',
        
    },

    categoryCancelButton: {
        display: 'flex',
        flexDirection: 'row',

        borderRadius: 8,
        height: '100%',
        width: '80%',
        backgroundColor: '#E86DC3',

        justifyContent: 'center',
        alignItems: 'center'
    },

    categoryCancelText: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'Tahoma,Verdana,Segoe,sans-serif'
    },






    // Items

    unselectedItemContainer: {
        flexDirection: 'row',

        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#a1a1a1',
        backgroundColor: '#ffffff',

        justifyContent: 'center',
        alignItems: 'center',
    },

    selectedItemContainer: {
        flexDirection: 'row',

        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#a1a1a1',
        backgroundColor: '#f7bae5',

        justifyContent: 'center',
        alignItems: 'center',
    },

    unselectedItemText: {
        color: '#363636',
    },

    selectedItemText: {
        color: '#363636',
    },
    

    

    // Icons

    selectedIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',

        padding: 10,

        backgroundColor: '#e3ffd1',
        borderWidth: 0.5,
        borderColor: 'rgba(2, 204, 42, 1)',
        // backgroundColor: 'red',
    },

    unselectedIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',

        padding: 10,

        borderWidth: 0.5,
        borderColor: '#efefef',
        // backgroundColor: 'green'
    },

    unselectedIcon: {
        color: '#363636',
    },

    selectedIcon: {
        color: '#363636',
    },
});

export default defaultStyles;
