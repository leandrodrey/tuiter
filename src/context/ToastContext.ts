import {createContext} from 'react';
import {type ToastOptions} from 'react-toastify';

// Define the context type
export interface ToastContextType {
    success: (message: string, options?: ToastOptions) => void;
    error: (message: string, options?: ToastOptions) => void;
    info: (message: string, options?: ToastOptions) => void;
    warning: (message: string, options?: ToastOptions) => void;
}

// Create the context
export const ToastContext = createContext<ToastContextType | undefined>(undefined);
