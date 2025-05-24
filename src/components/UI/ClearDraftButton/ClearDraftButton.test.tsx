import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import ClearDraftButton from './ClearDraftButton';
import type {PostFormData} from "../../../types/formTypes.ts";

describe('ClearDraftButton', () => {
    it('renders correctly with required props', () => {
        const mockOnClick = vi.fn();
        const mockResetForm = vi.fn();

        render(
            <ClearDraftButton
                onClick={mockOnClick}
                resetForm={mockResetForm}
                isDisabled={false}
            />
        );

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
        expect(screen.getByText('Clear')).toBeInTheDocument();
    });

    it('calls onClick with resetForm when clicked', () => {
        const mockOnClick = vi.fn();
        const mockResetForm = vi.fn() as (nextState?: { values: PostFormData }) => void;

        render(
            <ClearDraftButton
                onClick={mockOnClick}
                resetForm={mockResetForm}
                isDisabled={false}
            />
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
        expect(mockOnClick).toHaveBeenCalledWith(mockResetForm);
    });

    it('is disabled when isDisabled is true', () => {
        const mockOnClick = vi.fn();
        const mockResetForm = vi.fn();

        render(
            <ClearDraftButton
                onClick={mockOnClick}
                resetForm={mockResetForm}
                isDisabled={true}
            />
        );

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();

        // Verify that clicking a disabled button doesn't trigger the onClick
        fireEvent.click(button);
        expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('has the correct styling', () => {
        const mockOnClick = vi.fn();
        const mockResetForm = vi.fn();

        render(
            <ClearDraftButton
                onClick={mockOnClick}
                resetForm={mockResetForm}
                isDisabled={false}
            />
        );

        const button = screen.getByRole('button');
        expect(button.className).toContain('text-blue-400');
        expect(button.className).toContain('hover:bg-gray-800');
        expect(button.className).toContain('hover:text-blue-300');

        // Check for the SVG icon
        const svgIcon = document.querySelector('svg');
        expect(svgIcon).toBeInTheDocument();
    });
});
