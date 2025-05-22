import {AuthProvider} from './context/AuthProvider.tsx';
import {ToastProvider} from './context/ToastProvider.tsx';
import AppRouter from "./routes/AppRouter.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import {TuiterLogo} from "./components/UI";

function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <div className="min-h-screen flex flex-col">
                    <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <TuiterLogo className="flex items-center" />
                                    <h1 className="ml-3 text-3xl font-bold text-center text-gray-900 dark:text-white">Tuiter Application</h1>
                                </div>
                                <Navbar />
                            </div>
                        </div>
                    </header>

                    <main className="flex-grow">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                            <AppRouter/>
                        </div>
                    </main>

                    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 mt-auto">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-600 dark:text-gray-400">
                            <div className="flex justify-center items-center mb-2">
                                <TuiterLogo className="h-6 w-6 mr-2" />
                                <span>&copy; {new Date().getFullYear()} - A social media platform</span>
                            </div>
                        </div>
                    </footer>
                </div>
            </ToastProvider>
        </AuthProvider>
    )
}

export default App
