import './App.css'
import AppRouter from "./routes/AppRouter.tsx";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
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
        </AuthProvider>
    )
}

export default App
