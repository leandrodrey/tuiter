import type {JSX, ReactNode} from 'react';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Footer from '../components/Footer/Footer';

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
        <div data-testid="layout-container" className="min-h-screen flex flex-col bg-[#15202b]">
            <div data-testid="layout-content" className="flex flex-grow overflow-x-hidden">
                <Header/>
                <Main>
                    {children}
                </Main>
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;
