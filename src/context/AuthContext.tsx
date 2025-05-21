import {
    createContext,
    useState,
    useContext,
    useEffect,
    type ReactNode,
    type Dispatch, // Importado para el tipo de login
    type SetStateAction // Importado para el tipo de login
} from "react";
import { setHttpAuthToken } from '../utils/authUtils'; // Ajusta la ruta según tu estructura

// --- Constants ---
export const USER_TOKEN_KEY = "user_token";
export const USER_DATA_KEY = "user_data";

// --- Types ---
interface UserInformation {
    name?: string;
    email?: string;
    // Agrega otras propiedades del usuario que necesites
    [key: string]: any; // Para permitir otras propiedades si es necesario
}

interface AuthState {
    isLoadingAuth: boolean;
    isAuthenticated: boolean;
    userToken: string | null;
    userInformation: UserInformation | null;
}

interface AuthContextType extends AuthState {
    isLoggedIn: () => boolean;
    getUserInformationAPI: () => Promise<UserInformation | null>; // Renombrado para claridad
    login: (token: string, userData: UserInformation) => void;
    logout: () => void;
    // Si necesitas exponer los setters directamente (menos común para login/logout)
    // setUserToken: Dispatch<SetStateAction<string | null>>;
    // setUserInformation: Dispatch<SetStateAction<UserInformation | null>>;
}

// --- Initial State ---
const initialToken = localStorage.getItem(USER_TOKEN_KEY);
const initialUserData = JSON.parse(localStorage.getItem(USER_DATA_KEY) || 'null') as UserInformation | null;

// Establece el token global para Axios al cargar la aplicación por primera vez
setHttpAuthToken(initialToken);

const initialAuthState: AuthState = {
    isLoadingAuth: true, // Empezar en true hasta que se verifique el token/usuario
    isAuthenticated: !!initialToken,
    userToken: initialToken,
    userInformation: initialUserData,
};

// --- Context Creation ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Custom Hook to use AuthContext ---
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

// --- AuthProvider Component ---
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(initialAuthState.isLoadingAuth);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthState.isAuthenticated);
    const [userToken, setUserTokenState] = useState<string | null>(initialAuthState.userToken);
    const [userInformation, setUserInformationState] = useState<UserInformation | null>(initialAuthState.userInformation);

    const isLoggedIn = (): boolean => {
        return !!userToken;
    };

    // Simulación de una llamada API para obtener información del usuario
    // Deberías reemplazar esto con tu lógica real de API
    const getUserInformationAPI = async (): Promise<UserInformation | null> => {
        if (!userToken) { // Usa el userToken del estado de React
            console.warn("No user token available to fetch user information.");
            return null;
        }

        setIsLoadingAuth(true);
        try {
            // Aquí harías tu llamada real a la API, ej:
            // const response = await api.get('/me', { headers: { Authorization: userToken } });
            // const userData = response.data;

            // Simulación:
            await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay de red
            const simulatedUserData: UserInformation = userInformation || { // Usa la info ya cargada o datos de ejemplo
                name: "Usuario Ejemplo",
                email: "usuario@ejemplo.com"
            };

            setUserInformationState(simulatedUserData);
            localStorage.setItem(USER_DATA_KEY, JSON.stringify(simulatedUserData));
            return simulatedUserData;
        } catch (error) {
            console.error("Error loading user information from API:", error);
            // Considera desloguear al usuario si la obtención de datos falla debido a token inválido
            // logout();
            return null;
        } finally {
            setIsLoadingAuth(false);
        }
    };

    const login = (token: string, userData: UserInformation): void => {
        setUserTokenState(token);
        setUserInformationState(userData);
        setIsAuthenticated(true);

        localStorage.setItem(USER_TOKEN_KEY, token);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        setHttpAuthToken(token); // <-- ACTUALIZA EL TOKEN GLOBAL PARA AXIOS
        setIsLoadingAuth(false); // Puede que quieras quitar esto si getUserInformationAPI se llama después
    };

    const logout = (): void => {
        setUserTokenState(null);
        setUserInformationState(null);
        setIsAuthenticated(false);

        localStorage.removeItem(USER_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
        setHttpAuthToken(null); // <-- LIMPIA EL TOKEN GLOBAL PARA AXIOS
        setIsLoadingAuth(false);
    };

    useEffect(() => {
        const loadInitialData = async () => {
            // Si hay un token pero no información del usuario, intenta cargarla
            // Esto es útil si cierras y abres la pestaña y el token sigue siendo válido
            if (userToken && !userInformation) {
                // console.log("AuthContext: Token found, attempting to load user info.");
                await getUserInformationAPI();
            } else {
                // console.log("AuthContext: No token or user info already present, setting loading to false.");
                setIsLoadingAuth(false);
            }
        };

        loadInitialData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Se ejecuta solo una vez al montar el AuthProvider

    // Context value
    const contextValue: AuthContextType = {
        isLoadingAuth,
        isAuthenticated,
        userToken,
        userInformation,
        isLoggedIn,
        getUserInformationAPI, // Expone la función renombrada
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
