import type {JSX, ReactNode} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

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
            <div className="flex flex-grow overflow-x-hidden">
                <Header />
                <Main>
                    {children}
                </Main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
