import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Formik, Form } from 'formik';
import PostFormFields from './PostFormFields';

// Mock Formik context
const renderWithFormik = (ui: React.ReactNode) => {
  return render(
    <Formik
      initialValues={{ message: '' }}
      onSubmit={vi.fn()}
    >
      <Form>
        {ui}
      </Form>
    </Formik>
  );
};

describe('PostFormFields', () => {
  it('renders correctly when not submitting', () => {
    renderWithFormik(<PostFormFields isSubmitting={false} />);

    // Check if the textarea is rendered
    const textarea = screen.getByPlaceholderText("What's happening?");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('name', 'message');
    expect(textarea).toHaveAttribute('id', 'message');
    expect(textarea).not.toBeDisabled();

    // Check textarea classes
    expect(textarea).toHaveClass('bg-transparent');
    expect(textarea).toHaveClass('text-gray-400');
    expect(textarea).toHaveClass('font-medium');
    expect(textarea).toHaveClass('text-lg');
    expect(textarea).toHaveClass('w-full');
  });

  it('disables the textarea when submitting', () => {
    renderWithFormik(<PostFormFields isSubmitting={true} />);

    const textarea = screen.getByPlaceholderText("What's happening?");
    expect(textarea).toBeDisabled();
  });

  it('shows error message when provided by Formik', async () => {
    render(
      <Formik
        initialValues={{ message: '' }}
        initialErrors={{ message: 'Message is required' }}
        initialTouched={{ message: true }}
        onSubmit={vi.fn()}
      >
        <Form>
          <PostFormFields isSubmitting={false} />
        </Form>
      </Formik>
    );

    // Check if the error message is displayed
    const errorMessage = screen.getByText('Message is required');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-red-600');
  });
});
