import {type JSX} from 'react';

interface AvatarProps {
    username: string;
    avatarUrl?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Avatar = ({
    username,
    avatarUrl,
    size = 'md',
    className = ''
}: AvatarProps): JSX.Element => {

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12'
    };

    const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}`;

    // If avatarUrl is empty string, use fallback
    const imageUrl = avatarUrl && avatarUrl.trim() !== '' ? avatarUrl : fallbackUrl;

    return (
        <img
            src={imageUrl}
            alt={`${username}'s avatar`}
            className={`${sizeClasses[size]} rounded-full ${className}`}
        />
    );
};

export default Avatar;
