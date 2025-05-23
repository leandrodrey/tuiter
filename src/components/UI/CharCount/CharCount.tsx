import {type JSX} from 'react';

interface CharCountProps {
    charCount: number;
    maxChars: number;
}

/**
 * Character count component that displays the current character count and maximum allowed characters.
 * Changes color based on how close the user is to the character limit.
 *
 * @param {CharCountProps} props - Component props
 * @returns {JSX.Element} The character count component
 */
const CharCount = ({charCount, maxChars}: CharCountProps): JSX.Element => {
    const isOverLimit = charCount > maxChars;

    return (
        <span className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-400'}`}>
            {charCount}/{maxChars}
        </span>
    );
};

export default CharCount;
