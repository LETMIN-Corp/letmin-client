import React from "react";

export const AuthContext = React.createContext({});

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AuthProvider : React.FC = ({ children }) => {
    const [user, setUser] = React.useState({
        name: 'Not logged in',
        role: 'admin',
    });

    function getUser() {
        return user;
    };

    function getRole() : string {
        return user.role;
    };
    
    async function requestData(url: string, method: string, data?: any) : Promise<any> {
        const token = localStorage.getItem('token');
        
        return await fetch(`${API_URL}/api${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token || '',
            },
            body: JSON.stringify(data),
        })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            return JSON.stringify(err);
        });
    }

    async function isAuthenticated() {
        const verify = await requestData('/users/profile', 'GET');
        console.log(verify);
        return verify;
    }

    async function signIn(role: string, data: any): Promise<any> {
        const user = await requestData(`/users/login-${role}`, 'POST', data);
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        return user;
    }

    function signOut(): void {
        localStorage.removeItem('user');
    }

    function isAdmin() {
        return requestData('/users/admin-protectd', 'GET');
    }

    return (
        <AuthContext.Provider value={{ getUser, getRole, signIn, signOut, isAdmin, user, isAuthenticated }}>
            { children }
        </AuthContext.Provider>
    )
}
