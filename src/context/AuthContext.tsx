import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types';
import {createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER = {
    id: "",
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: '',
    
};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isAuthenticated: false,
    isPending: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
    logoutUser: () => {},
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isPending, setisPending] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const navigate = useNavigate();

    const logoutUser = () => {
        setUser(INITIAL_USER);
        setIsAuthenticated(false);
        localStorage.removeItem('cookieFallback');
        navigate('/sign-in');
    };

    const checkAuthUser = async () => {
        setisPending(true);
        try {
            const currentAccount = await getCurrentUser();

            if(currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio,
                })

                setIsAuthenticated(true);
                return true;
            }

            // If no current account, logout user
            logoutUser();
            return false;
        } catch (error) {
            console.log("Auth check failed:", error);
            // Session expired or invalid, logout user
            logoutUser();
            return false;
        } finally{
            setisPending(false);
        }
    };

    // Check authentication status periodically
    useEffect(() => {
        const interval = setInterval(() => {
            if (isAuthenticated) {
                checkAuthUser();
            }
        }, 5 * 60 * 1000); // Check every 5 minutes

        return () => clearInterval(interval);
    }, [isAuthenticated]);

    useEffect(() => {
        const cookieFallback = localStorage.getItem('cookieFallback');
        
        if(
            cookieFallback === '[]' ||
            cookieFallback === null ||
            cookieFallback === undefined
        ) {
            navigate('/sign-in');
        } else {
            checkAuthUser();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ 
            user, 
            setUser, 
            isAuthenticated, 
            setIsAuthenticated, 
            isPending, 
            checkAuthUser, 
            logoutUser 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
