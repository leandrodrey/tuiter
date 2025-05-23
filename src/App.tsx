import {AuthProvider} from './context/AuthProvider.tsx';
import {UserProvider} from './context/UserProvider.tsx';
import {ToastProvider} from './context/ToastProvider.tsx';
import AppRouter from "./routes/AppRouter.tsx";
import Layout from "./components/Layout/Layout.tsx";

/**
 * Main application component that sets up the app structure.
 * Provides authentication and toast notification contexts to the entire application.
 * Uses the Layout component to provide a consistent structure across the application.
 * @returns The rendered application with all providers and layout components
 */
function App() {
    return (
        <ToastProvider>
            <AuthProvider>
                <UserProvider>
                    <Layout>
                        <AppRouter/>
                    </Layout>
                </UserProvider>
            </AuthProvider>
        </ToastProvider>
    )
}

export default App
