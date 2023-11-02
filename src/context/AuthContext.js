import React from "react";

const AuthContext = React.createContext({
    signIn: async () => {},
    signOut: async () => {},
    sessionExpired: async () => {}
});

export {AuthContext};
