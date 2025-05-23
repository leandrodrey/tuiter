import type {JSX, ReactNode} from 'react';

/**
 * Main component that displays the main content area.
 * Provides a container for the main content with consistent styling.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - The content to render within the main area
 * @returns {JSX.Element} The main content component
 */
const Main = ({children}: { children: ReactNode }): JSX.Element => {
    return (
        <main className="flex-grow">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </div>
        </main>
    );
};

export default Main;
