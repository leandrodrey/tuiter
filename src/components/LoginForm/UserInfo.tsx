import {type JSX} from 'react';
import {useToast} from "../../hooks/useToast.ts";
import type {UserInformation} from "../../types/userTypes";

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
        <div className="user-info">
            <span>Welcome, {userInformation?.name}!</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
    );
};

export default UserInfo;
