import type {JSX} from 'react';
import Navbar from "../Navbar/Navbar.tsx";
import {TuiterLogo} from "../UI";

/**
 * Header component that displays the application header.
 * Includes the logo, application title, and navigation bar.
 *
 * @returns {JSX.Element} The header component
 */
const Header = (): JSX.Element => {
    return (
        <header className="bg-wildBlueYonder dark:bg-periwinkle/20 border-b border-cameoPink dark:border-periwinkle/30 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <TuiterLogo className="flex items-center text-maxBlue dark:text-skyBlue"/>
                        <h1 className="ml-3 text-3xl font-bold text-center text-maxBlue dark:text-skyBlue">Tuiter Application</h1>
                    </div>
                    <Navbar/>
                </div>
            </div>
        </header>
    );
};

export default Header;
