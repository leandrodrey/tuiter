import type {JSX, ReactNode} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

/**
 * Layout component that provides a consistent structure for the application.
 * Uses Header, Main, and Footer components to create a consistent layout.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - The content to render within the layout
 * @returns {JSX.Element} The layout with the provided content
 */
const Layout = ({children}: { children: ReactNode }): JSX.Element => {
    return (
        <div className="min-h-screen flex flex-col bg-wildBlueYonder/10 dark:bg-gray-900">
            <Header/>
            <Main>
                {children}
            </Main>
            <Footer/>
        </div>
    );
};

export default Layout;
