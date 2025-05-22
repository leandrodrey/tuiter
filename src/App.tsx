import './App.css'
import {AuthProvider} from './context/AuthProvider.tsx';
import {ToastProvider} from './context/ToastProvider.tsx';
import AppRouter from "./routes/AppRouter.tsx";

function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <div className="app-container">
                    <header className="app-header">
                        <h1>Tuiter App</h1>
                    </header>

                    <main className="app-content">
                        <AppRouter/>
                    </main>

                    <footer className="app-footer">
                        <p>&copy; {new Date().getFullYear()} Tuiter App - A social media platform</p>
                    </footer>
                </div>
            </ToastProvider>
        </AuthProvider>
    )
}

export default App
