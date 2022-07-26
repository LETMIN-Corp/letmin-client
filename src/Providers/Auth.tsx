import React from "react";

export const AuthContext = React.createContext({});

export const AuthProvider : React.FC = ({ children }) => {
    const user = {
        name: 'Usuário',
        role: 'company',
    };

    function getName() {
        return user.name;
    };

    function getRole() {
        return user.role;
    };

    return (
        <AuthContext.Provider value={{ getName, getRole }}>
            { children }
        </AuthContext.Provider>
    )
}
