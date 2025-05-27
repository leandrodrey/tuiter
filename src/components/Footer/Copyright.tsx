import type {JSX} from 'react';

interface CopyrightProps {
    year?: number;
    text?: string;
    className?: string;
}

/**
 * Copyright component that displays a copyright notice.
 * This is a reusable component that can be used in different parts of the application.
 *
 * @param {CopyrightProps} props - The component props
 * @returns {JSX.Element} The copyright component
 */
const Copyright = ({
    year = new Date().getFullYear(),
    text,
    className = 'text-xs sm:text-sm md:text-base'
}: CopyrightProps): JSX.Element => {
    return (
        <span className={className}>
        &copy; {year} - {text}
    </span>
    );
};

export default Copyright;
