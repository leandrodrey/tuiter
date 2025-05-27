import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import * as React from 'react';
import {ToastProvider} from './ToastProvider';
import {ToastContext} from './ToastContext';
import * as reactToastify from 'react-toastify';

// Mock the ToastContainer component
vi.mock('react-toastify', async () => {
    const actual = await vi.importActual('react-toastify');
    return {
        ...actual,
        ToastContainer: () => <div data-testid="mock-toast-container"/>
    };
});

describe('ToastProvider', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        vi.clearAllMocks();

        // Mock the toast methods
        vi.spyOn(reactToastify.toast, 'success').mockImplementation(vi.fn());
        vi.spyOn(reactToastify.toast, 'error').mockImplementation(vi.fn());
        vi.spyOn(reactToastify.toast, 'info').mockImplementation(vi.fn());
        vi.spyOn(reactToastify.toast, 'warning').mockImplementation(vi.fn());
    });

    it('should render children and ToastContainer', () => {
        render(
            <ToastProvider>
                <div data-testid="test-child">Test Child</div>
            </ToastProvider>
        );

        // Check if children are rendered
        expect(screen.getByTestId('test-child')).toBeInTheDocument();
        expect(screen.getByText('Test Child')).toBeInTheDocument();

        // Check if ToastContainer is rendered
        expect(screen.getByTestId('mock-toast-container')).toBeInTheDocument();
    });

    it('should provide toast context value with all methods', () => {
        // Create a test component that consumes the context
        const TestConsumer = () => {
            const toastContext = React.useContext(ToastContext);

            if (!toastContext) {
                return <div>No context</div>;
            }

            return (
                <div>
                    <button data-testid="success-btn" onClick={() => toastContext.success('Success message')}>
                        Success
                    </button>
                    <button data-testid="error-btn" onClick={() => toastContext.error('Error message')}>
                        Error
                    </button>
                    <button data-testid="info-btn" onClick={() => toastContext.info('Info message')}>
                        Info
                    </button>
                    <button data-testid="warning-btn" onClick={() => toastContext.warning('Warning message')}>
                        Warning
                    </button>
                </div>
            );
        };

        render(
            <ToastProvider>
                <TestConsumer/>
            </ToastProvider>
        );

        // Test success method
        screen.getByTestId('success-btn').click();
        expect(reactToastify.toast.success).toHaveBeenCalledWith('Success message', undefined);

        // Test error method
        screen.getByTestId('error-btn').click();
        expect(reactToastify.toast.error).toHaveBeenCalledWith('Error message', undefined);

        // Test info method
        screen.getByTestId('info-btn').click();
        expect(reactToastify.toast.info).toHaveBeenCalledWith('Info message', undefined);

        // Test warning method
        screen.getByTestId('warning-btn').click();
        expect(reactToastify.toast.warning).toHaveBeenCalledWith('Warning message', undefined);
    });

    it('should pass options to toast methods', () => {
        // Create a test component that consumes the context
        const TestConsumer = () => {
            const toastContext = React.useContext(ToastContext);

            if (!toastContext) {
                return <div>No context</div>;
            }

            return (
                <div>
                    <button
                        data-testid="success-with-options-btn"
                        onClick={() => toastContext.success('Success with options', {autoClose: 5000})}
                    >
                        Success with options
                    </button>
                </div>
            );
        };

        render(
            <ToastProvider>
                <TestConsumer/>
            </ToastProvider>
        );

        // Test success method with options
        screen.getByTestId('success-with-options-btn').click();
        expect(reactToastify.toast.success).toHaveBeenCalledWith('Success with options', {autoClose: 5000});
    });
});
