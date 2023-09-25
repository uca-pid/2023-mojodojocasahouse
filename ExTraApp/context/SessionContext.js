import React from "react";

const SessionContext = React.createContext({
    sessionCookie: null,
    setSessionCookie: () => {}
});

export default SessionContext;