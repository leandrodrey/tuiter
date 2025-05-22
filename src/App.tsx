import {AuthProvider} from './context/AuthProvider.tsx';
import {ToastProvider} from './context/ToastProvider.tsx';
import AppRouter from "./routes/AppRouter.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";

function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <div className="min-h-screen flex flex-col">
                    <header className="bg-white dark:bg-gray-800 shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tuiter App</h1>
                                <Navbar />
                            </div>
                        </div>
                    </header>

                    <main className="flex-grow">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                            <AppRouter/>
                        </div>
                    </main>

                    <footer className="bg-white dark:bg-gray-800 shadow-sm mt-auto">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-600 dark:text-gray-400">
                            <p>&copy; {new Date().getFullYear()} Tuiter App - A social media platform</p>
                        </div>
                    </footer>
                </div>
            </ToastProvider>
        </AuthProvider>
    )
}

export default App
