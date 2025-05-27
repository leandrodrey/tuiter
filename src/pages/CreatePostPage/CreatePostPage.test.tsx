import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import CreatePostPage from './CreatePostPage';

// Mock the hooks
vi.mock('../../hooks/post-creation/usePostCreation', () => ({
    usePostCreation: vi.fn(() => ({
        initialValues: {
            content: '',
            image: null
        },
        handleSubmit: vi.fn(),
        handleSaveDraft: vi.fn(),
        handleClearDraft: vi.fn()
    }))
}));

vi.mock('../../hooks/context/useUser', () => ({
    useUser: vi.fn(() => ({
        userInformation: {
            avatar_url: 'https://example.com/avatar.jpg'
        }
    }))
}));

// Mock the components
vi.mock('../../components/UI', () => ({
    PageHeader: ({title, subtitle}) => (
        <div data-testid="page-header" data-title={title} data-subtitle={subtitle}>
            Page Header
        </div>
    )
}));

vi.mock('../../components/PostForm/PostForm', () => ({
    __esModule: true,
    default: ({
        initialValues,
        validationSchema,
        onSubmit,
        onSaveDraft,
        onClearDraft,
        userAvatar
    }) => (
        <div
            data-testid="post-form"
            data-has-initial-values={!!initialValues}
            data-has-validation-schema={!!validationSchema}
            data-has-submit={!!onSubmit}
            data-has-save-draft={!!onSaveDraft}
            data-has-clear-draft={!!onClearDraft}
            data-user-avatar={userAvatar}
        >
            Post Form
        </div>
    )
}));

describe('CreatePostPage', () => {
    it('renders correctly with all components', () => {
        render(<CreatePostPage/>);

        // Check if the page header is rendered with correct props
        const pageHeader = screen.getByTestId('page-header');
        expect(pageHeader).toBeInTheDocument();
        expect(pageHeader).toHaveAttribute('data-title', 'Create New Post');
        expect(pageHeader).toHaveAttribute('data-subtitle', 'Create a new post and share it with the world.');

        // Check if the post form is rendered with correct props
        const postForm = screen.getByTestId('post-form');
        expect(postForm).toBeInTheDocument();
        expect(postForm).toHaveAttribute('data-has-initial-values', 'true');
        expect(postForm).toHaveAttribute('data-has-validation-schema', 'true');
        expect(postForm).toHaveAttribute('data-has-submit', 'true');
        expect(postForm).toHaveAttribute('data-has-save-draft', 'true');
        expect(postForm).toHaveAttribute('data-has-clear-draft', 'true');
        expect(postForm).toHaveAttribute('data-user-avatar', 'https://example.com/avatar.jpg');
    });
});
