import type {JSX, ReactNode} from 'react';
import Header from './Header/Header.tsx';
import Main from './Main/Main.tsx';
import Footer from './Footer/Footer.tsx';

/**
 * Layout component that provides a Twitter-like structure for the application.
 * Uses the Header, Main, and Footer components to create a consistent layout.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - The content to render within the layout
 * @returns {JSX.Element} The layout with the provided content
 */
const Layout = ({children}: { children: ReactNode }): JSX.Element => {
    return (
        <div className="min-h-screen flex flex-col bg-[#15202b]">
            {/* Skip to main content link for keyboard users */}
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-2 focus:bg-blue-500 focus:text-white">
                Skip to main content
            </a>
            <div className="flex flex-grow overflow-x-hidden">
                <Header/>
                <Main id="main-content">
                    {children}
                </Main>
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;
