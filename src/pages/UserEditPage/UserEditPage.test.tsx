import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import UserEditPage from './UserEditPage';

// Mock the hooks
const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(() => mockNavigate)
}));

const mockToast = {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn()
};

vi.mock('../../hooks/context/useToast.ts', () => ({
    useToast: vi.fn(() => mockToast)
}));

// Default values for useUserEdit hook
const mockHandleSubmit = vi.fn();
const mockInitialValues = {
    name: 'Test User',
    email: 'test@example.com',
    avatar_url: 'https://example.com/avatar.jpg',
    password: '',
    confirmPassword: ''
};

// Mock the useUserEdit hook with different states
const useUserEditMock = vi.fn();

vi.mock('./hooks/useUserEdit.ts', () => ({
    useUserEdit: () => useUserEditMock()
}));

// Mock the components
vi.mock('../../components/UI', () => ({
    Loader: ({text, fullScreen}) => (
        <div data-testid="loader" data-text={text} data-full-screen={fullScreen}>
            Loading...
        </div>
    ),
    PageHeader: ({title}) => (
        <div data-testid="page-header" data-title={title}>
            Page Header
        </div>
    )
}));

vi.mock('../../components/UserEdit', () => ({
    UserEditForm: ({initialValues, onSubmit, error}) => (
        <div
            data-testid="user-edit-form"
            data-has-initial-values={!!initialValues}
            data-has-submit={!!onSubmit}
            data-error={error || 'none'}
        >
            User Edit Form
        </div>
    )
}));

describe('UserEditPage', () => {
    it('renders loading state correctly', () => {
        // Set up the mock to return loading state
        useUserEditMock.mockReturnValue({
            initialValues: mockInitialValues,
            isLoading: true,
            error: null,
            handleSubmit: mockHandleSubmit
        });

        render(<UserEditPage/>);

        // Check if the loader is rendered
        const loader = screen.getByTestId('loader');
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveAttribute('data-text', 'Loading user data...');
        expect(loader).toHaveAttribute('data-full-screen', 'true');
    });

    it('renders form correctly when data is loaded', () => {
        // Set up the mock to return loaded state
        useUserEditMock.mockReturnValue({
            initialValues: mockInitialValues,
            isLoading: false,
            error: null,
            handleSubmit: mockHandleSubmit
        });

        render(<UserEditPage/>);

        // Check if the page header is rendered with correct props
        const pageHeader = screen.getByTestId('page-header');
        expect(pageHeader).toBeInTheDocument();
        expect(pageHeader).toHaveAttribute('data-title', 'Edit Profile');

        // Check if the user edit form is rendered with correct props
        const userEditForm = screen.getByTestId('user-edit-form');
        expect(userEditForm).toBeInTheDocument();
        expect(userEditForm).toHaveAttribute('data-has-initial-values', 'true');
        expect(userEditForm).toHaveAttribute('data-has-submit', 'true');
        expect(userEditForm).toHaveAttribute('data-error', 'none');
    });

    it('renders form with error message when there is an error', () => {
        // Set up the mock to return error state
        useUserEditMock.mockReturnValue({
            initialValues: mockInitialValues,
            isLoading: false,
            error: 'Failed to update profile',
            handleSubmit: mockHandleSubmit
        });

        render(<UserEditPage/>);

        // Check if the user edit form is rendered with error
        const userEditForm = screen.getByTestId('user-edit-form');
        expect(userEditForm).toBeInTheDocument();
        expect(userEditForm).toHaveAttribute('data-error', 'Failed to update profile');
    });
});
