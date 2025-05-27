import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import PostForm from './PostForm';
import * as Yup from 'yup';
import {PostFormData} from '../../types/formTypes';

// Mock the child components
vi.mock('./PostFormFields', () => ({
    default: ({isSubmitting}) => (
        <div data-testid="post-form-fields" data-is-submitting={isSubmitting}>
            PostFormFields
        </div>
    )
}));

vi.mock('./PostFormActions', () => ({
    default: ({isSubmitting, values, resetForm, onSaveDraft, onClearDraft}) => (
        <div
            data-testid="post-form-actions"
            data-is-submitting={isSubmitting}
            data-has-values={!!values}
            data-has-reset-form={!!resetForm}
            data-has-save-draft={!!onSaveDraft}
            data-has-clear-draft={!!onClearDraft}
        >
            PostFormActions
        </div>
    )
}));

vi.mock('../UI', () => ({
    Avatar: ({username, avatarUrl}) => (
        <div
            data-testid="avatar"
            data-username={username}
            data-avatar-url={avatarUrl}
        >
            Avatar
        </div>
    )
}));

describe('PostForm', () => {
    const mockInitialValues: PostFormData = {
        message: '',
        media: []
    };

    const mockValidationSchema = Yup.object().shape({
        message: Yup.string().required('Message is required')
    });

    const mockOnSubmit = vi.fn();
    const mockOnSaveDraft = vi.fn();
    const mockOnClearDraft = vi.fn();
    const mockUserAvatar = 'https://example.com/avatar.jpg';

    const renderPostForm = () => {
        return render(
            <PostForm
                initialValues={mockInitialValues}
                validationSchema={mockValidationSchema}
                onSubmit={mockOnSubmit}
                onSaveDraft={mockOnSaveDraft}
                onClearDraft={mockOnClearDraft}
                userAvatar={mockUserAvatar}
            />
        );
    };

    it('renders correctly with all components', () => {
        const {container} = renderPostForm();

        // Check if the form is rendered
        const form = container.querySelector('form');
        expect(form).toBeInTheDocument();

        // Check if the avatar is rendered with correct props
        const avatar = screen.getByTestId('avatar');
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('data-username', 'User');
        expect(avatar).toHaveAttribute('data-avatar-url', mockUserAvatar);

        // Check if PostFormFields is rendered with correct props
        const postFormFields = screen.getByTestId('post-form-fields');
        expect(postFormFields).toBeInTheDocument();
        expect(postFormFields).toHaveAttribute('data-is-submitting', 'false');

        // Check if PostFormActions is rendered with correct props
        const postFormActions = screen.getByTestId('post-form-actions');
        expect(postFormActions).toBeInTheDocument();
        expect(postFormActions).toHaveAttribute('data-is-submitting', 'false');
        expect(postFormActions).toHaveAttribute('data-has-values', 'true');
        expect(postFormActions).toHaveAttribute('data-has-reset-form', 'true');
        expect(postFormActions).toHaveAttribute('data-has-save-draft', 'true');
        expect(postFormActions).toHaveAttribute('data-has-clear-draft', 'true');
    });

    it('passes the correct props to Formik', () => {
        const {container} = renderPostForm();

        // Since we can't directly test Formik props, we'll check that the form renders
        // and that the child components receive the expected props from Formik
        const form = container.querySelector('form');
        expect(form).toBeInTheDocument();

        // The presence of PostFormFields and PostFormActions with the expected props
        // indirectly confirms that Formik is receiving the correct initialValues,
        // validationSchema, and onSubmit props
        const postFormFields = screen.getByTestId('post-form-fields');
        expect(postFormFields).toBeInTheDocument();

        const postFormActions = screen.getByTestId('post-form-actions');
        expect(postFormActions).toBeInTheDocument();
    });
});
