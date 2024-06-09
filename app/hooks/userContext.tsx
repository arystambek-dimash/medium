'use client';

import React, {createContext, useContext, useState, ReactNode} from 'react';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    profileImage: string;
}

interface UserContextInterface {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

const defaultState: UserContextInterface = {
    user: null,
    login: () => {
    },
    logout: () => {
    }
};

const UserContext = createContext<UserContextInterface>(defaultState);

export const useUser = () => {
    return useContext(UserContext);
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        console.log(user)
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};
