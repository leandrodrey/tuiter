import {
    useState,
    useEffect,
    useCallback,
    type ReactNode
} from "react";
import {USER_DATA_KEY} from '../constants/authConstants.ts';
import {UserContext, initialUserState} from "./UserContext.ts";
import type {UserContextType, UserInformation} from "../types/userTypes.ts";
import {useAuthContext} from "../hooks/context/useAuthContext.ts";
import {useToast} from "../hooks/context/useToast.ts";

/**
 * User Provider component that manages user information state and operations.
 * Provides user data fetching and updating functionality to child components.
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components that will have access to user context
 * @returns {JSX.Element} Provider component with user context
 */
export const UserProvider = ({children}: { children: ReactNode }) => {
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(initialUserState.isLoadingUser);
    const [userInformation, setUserInformation] = useState<UserInformation | null>(initialUserState.userInformation);
    const {userToken, logout} = useAuthContext();
    const toast = useToast();

    /**
     * Fetches the current user's information from the API.
     * Updates the user information state and stores it in localStorage.
     * Handles authentication errors by logging out the user if needed.
     *
     * @returns {Promise<UserInformation | null>} A promise that resolves with the user information or null if an error
     *     occurs
     */
    const getUserInformation = useCallback(async (): Promise<UserInformation | null> => {
        if (!userToken) {
            console.warn("No user token available to fetch user information.");
            return null;
        }

        setIsLoadingUser(true);
        try {
            const {apiGetProfile} = await import('../services/ProfileService');
            const profileData = await apiGetProfile();

            const userData: UserInformation = {
                name: profileData.name,
                email: profileData.email,
                avatar_url: profileData.avatar_url
            };

            setUserInformation(userData);
            localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error("Error loading user information from API:", error);

            interface ApiError {
                response?: {
                    status?: number;
                };
            }

            if ((error as ApiError)?.response?.status === 401) {
                logout();
            }
            return null;
        } finally {
            setIsLoadingUser(false);
        }
    }, [userToken, logout]);

    /**
     * Updates the current user's information via the API.
     * Merges the new data with existing user information and updates state and localStorage.
     * Handles errors by displaying appropriate messages and logging out if needed.
     *
     * @param {Partial<UserInformation>} userData - The user data to update
     * @returns {Promise<UserInformation | null>} A promise that resolves with the updated user information or null if
     *     an error occurs
     */
    const updateUserInformation = useCallback(async (userData: Partial<UserInformation>): Promise<UserInformation | null> => {
        if (!userToken) {
            console.warn("No user token available to update user information.");
            return null;
        }

        setIsLoadingUser(true);
        try {
            const {apiUpdateProfile} = await import('../services/ProfileService');
            const profileData = await apiUpdateProfile(userData);

            const updatedUserData: UserInformation = {
                ...userInformation,
                name: profileData.name,
                email: profileData.email,
                avatar_url: profileData.avatar_url
            };

            setUserInformation(updatedUserData);
            localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUserData));
            toast.success("Profile updated successfully!");
            return updatedUserData;
        } catch (error) {
            console.error("Error updating user information:", error);

            interface ApiError {
                response?: {
                    status?: number;
                    data?: {
                        message?: string;
                    }
                };
            }

            const errorMessage = (error as ApiError)?.response?.data?.message || 'Failed to update profile. Please try again.';
            toast.error(errorMessage);

            if ((error as ApiError)?.response?.status === 401) {
                logout();
            }
            return null;
        } finally {
            setIsLoadingUser(false);
        }
    }, [userToken, userInformation, logout, toast]);

    /**
     * Effect to load user data when token is available but user information is not.
     * Automatically fetches user information when needed.
     */
    useEffect(() => {
        const loadUserData = async () => {
            if (userToken && !userInformation) {
                await getUserInformation();
            }
        };

        loadUserData();
    }, [userToken, userInformation, getUserInformation]);

    /**
     * Effect to clear user data when the user logs out.
     * Removes user information from state and localStorage when token becomes null.
     */
    useEffect(() => {
        if (!userToken) {
            setUserInformation(null);
            localStorage.removeItem(USER_DATA_KEY);
        }
    }, [userToken]);

    /**
     * The user context value provided to consumers.
     * Contains all user state and functions.
     */
    const contextValue: UserContextType = {
        isLoadingUser,
        userInformation,
        getUserInformation,
        updateUserInformation,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
