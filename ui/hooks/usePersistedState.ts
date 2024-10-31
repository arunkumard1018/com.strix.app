// hooks/usePersistedState.ts
import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext, setUser } from '../store/slices/userSlice';

interface AuthInitializerProps {
    children: ReactNode;
}



const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userFromLocalStorage  = localStorage.getItem("user");

            if (userFromLocalStorage !== undefined && userFromLocalStorage !== null) {
                try {
                    const user = JSON.parse(userFromLocalStorage) as AuthContext;
                    dispatch(setUser(user));
                } catch (error) {
                    console.error("Failed to parse user from localStorage:");
                }
            }
        }
    }, [dispatch]);


    // // Save to localStorage whenever the user data changes
    // useEffect(() => {
    //     localStorage.setItem('user', JSON.stringify(user));
    // }, [user]);

    return children;
};

export default AuthInitializer;