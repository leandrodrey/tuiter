import type {JSX} from 'react';
import {TuiterLogo} from "../UI";

/**
 * Footer component that displays the application footer.
 * Includes copyright information and the application logo.
 *
 * @returns {JSX.Element} The footer component
 */
const Footer = (): JSX.Element => {
    return (
        <footer className="bg-wildBlueYonder dark:bg-periwinkle/20 border-t border-cameoPink dark:border-periwinkle/30 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-maxBlue dark:text-skyBlue">
                <div className="flex justify-center items-center mb-2">
                    <TuiterLogo className="h-6 w-6 mr-2 text-maxBlue dark:text-skyBlue"/>
                    <span>&copy; {new Date().getFullYear()} - A social media platform</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
