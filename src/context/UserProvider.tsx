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

export const UserProvider = ({children}: { children: ReactNode }) => {
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(initialUserState.isLoadingUser);
    const [userInformation, setUserInformation] = useState<UserInformation | null>(initialUserState.userInformation);
    const {userToken, logout} = useAuthContext();
    const toast = useToast();

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

    useEffect(() => {
        const loadUserData = async () => {
            if (userToken && !userInformation) {
                await getUserInformation();
            }
        };

        loadUserData();
    }, [userToken, userInformation, getUserInformation]);

    // Clear user data when user logs out (userToken becomes null)
    useEffect(() => {
        if (!userToken) {
            setUserInformation(null);
            localStorage.removeItem(USER_DATA_KEY);
        }
    }, [userToken]);

    // Context value
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
