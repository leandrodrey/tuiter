import {type JSX} from 'react';

interface CreatePostIconProps {
    className?: string;
}

/**
 * Create post icon component for navigation.
 * Displays a message or post creation icon.
 *
 * @param {CreatePostIconProps} props - Component props
 * @returns {JSX.Element} The create post icon component
 */
const CreatePostIcon = ({className = ''}: CreatePostIconProps): JSX.Element => {
    return (
        <svg className={className} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    );
};

export default CreatePostIcon;
