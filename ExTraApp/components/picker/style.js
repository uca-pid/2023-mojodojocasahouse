import { StyleSheet } from "react-native";

const defaultStyles = StyleSheet.create({

    // Selector

    button: {
        backgroundColor: '#ee9a00',

        paddingBottom: '2.5%',
        paddingTop: '2.5%',
        alignItems: 'center',
        marginTop: 5,
    },

    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
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
        backgroundColor: '#39fa4a',

        justifyContent: 'center',
        alignItems: 'center'
    },

    categoryCancelText: {
        color: '#474747',
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
        backgroundColor: '#e3ffd1',

        justifyContent: 'center',
        alignItems: 'center',
    },

    unselectedItemText: {
        color: '#363636',
    },

    selectedItemText: {
        color: '#363636',
    },
    
});

export default defaultStyles;
