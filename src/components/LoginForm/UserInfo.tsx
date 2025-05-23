import {type JSX} from 'react';
import {useToast} from "../../hooks/context/useToast.ts";
import type {UserInformation} from "../../types/userTypes";
import {Avatar} from '../UI';

interface UserInfoProps {
    userInformation: UserInformation | null;
    onLogout: () => void;
}

const UserInfo = ({userInformation, onLogout}: UserInfoProps): JSX.Element => {
    const toast = useToast();

    const handleLogout = () => {
        onLogout();
        toast.info('You have been logged out successfully');
    };

    return (
        <div className="flex items-center space-x-2">
            <Avatar
                username={userInformation?.name || 'User'}
                avatarUrl={userInformation?.avatar_url}
                size="sm"
                className="border border-gray-200 dark:border-gray-700"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{userInformation?.name}</span>
            <button
                onClick={handleLogout}
                className="p-2 text-red-400 hover:text-red-700 transition-colors cursor-pointer"
                aria-label="Logout"
                title="Logout"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            </button>
        </div>
    );
};

export default UserInfo;
