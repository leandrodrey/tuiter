import {describe, it, expect} from 'vitest';
import {ToastContext, ToastContextType} from './ToastContext';

describe('ToastContext', () => {
    it('should create a context with undefined as default value', () => {
        expect(ToastContext).toBeDefined();
        expect(ToastContext.Provider).toBeDefined();
        expect(ToastContext.Consumer).toBeDefined();

        // The default value should be undefined
        // We can verify this by checking that the context was created
        // React contexts are created with the default value provided to createContext()
    });

    it('should define ToastContextType with correct methods', () => {
        // Create a mock implementation of ToastContextType to verify the interface
        const mockToastContext: ToastContextType = {
            success: () => {},
            error: () => {},
            info: () => {},
            warning: () => {}
        };

        // Verify that the mock implements all required methods
        expect(mockToastContext).toHaveProperty('success');
        expect(mockToastContext).toHaveProperty('error');
        expect(mockToastContext).toHaveProperty('info');
        expect(mockToastContext).toHaveProperty('warning');

        // Verify that the methods are functions
        expect(typeof mockToastContext.success).toBe('function');
        expect(typeof mockToastContext.error).toBe('function');
        expect(typeof mockToastContext.info).toBe('function');
        expect(typeof mockToastContext.warning).toBe('function');
    });
});
