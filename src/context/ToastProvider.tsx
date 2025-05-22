import {type ReactNode} from 'react';
import {toast, ToastContainer, type ToastOptions} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContext, type ToastContextType} from "./ToastContext.ts";

export const ToastProvider = ({children}: { children: ReactNode }) => {
    // Define toast functions
    const success = (message: string, options?: ToastOptions) => {
        toast.success(message, options);
    };

    const error = (message: string, options?: ToastOptions) => {
        toast.error(message, options);
    };

    const info = (message: string, options?: ToastOptions) => {
        toast.info(message, options);
    };

    const warning = (message: string, options?: ToastOptions) => {
        toast.warning(message, options);
    };

    // Context value
    const contextValue: ToastContextType = {
        success,
        error,
        info,
        warning,
    };

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <ToastContainer position="top-right" autoClose={3000}/>
        </ToastContext.Provider>
    );
};
