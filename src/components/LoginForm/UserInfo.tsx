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
                className="px-3 py-1 text-xs font-medium text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 rounded-full transition-colors"
            >
                Logout
            </button>
        </div>
    );
};

export default UserInfo;
