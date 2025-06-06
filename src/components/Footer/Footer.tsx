import type {JSX} from 'react';
import {TuiterLogo} from "../UI";
import Copyright from "./Copyright.tsx";

/**
 * Footer component that displays the application footer in a Twitter-like style.
 * Includes copyright information and the application logo.
 *
 * @returns {JSX.Element} The footer component
 */
const Footer = (): JSX.Element => {
    return (
        <footer className="border-t border-gray-800 mt-auto">
            <div data-testid="footer-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-center text-gray-400">
                <div data-testid="footer-flex-container" className="flex flex-wrap justify-center items-center mb-1 sm:mb-2">
                    <TuiterLogo className="h-5 w-5 sm:h-6 sm:w-6 mr-1 sm:mr-2 text-blue-400"/>
                    <Copyright text="Tuiter: A Twitter-like platform"/>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
