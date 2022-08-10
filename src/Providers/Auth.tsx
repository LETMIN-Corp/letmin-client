import React from "react";

export const AuthContext = React.createContext({});

export const AuthProvider : React.FC = ({ children }) => {
    const user = {
        name: 'Usuário',
        role: 'company', //role: 'company', role: 'user', role: 'admin'
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
