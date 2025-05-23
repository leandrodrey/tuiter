import type {JSX, ReactNode} from 'react';

/**
 * The main part that displays the main content area in a Twitter-like style.
 * Provides a container for the main content with Twitter-like styling.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - The content to render within the main area
 * @param {string} [props.id] - Optional ID for the main element
 * @returns {JSX.Element} The main content part
 */
const Main = ({children, id}: { children: ReactNode, id?: string }): JSX.Element => {

    return (
        <main role="main" id={id} className="w-full" aria-label="Main content">
            <div className="flex justify-center px-2 sm:px-4">
                <section className="w-full border border-y-0 border-gray-800 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
                    {children}
                </section>
            </div>
        </main>
    );
};

export default Main;
