import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import Main from './Main';

describe('Main', () => {
    it('renders correctly with children', () => {
        render(
            <Main>
                <div data-testid="test-children">Test Children</div>
            </Main>
        );

        // Check if the main element is rendered with the correct role
        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();
        expect(main).toHaveClass('w-full');

        // Check if the section is rendered
        const section = screen.getByTestId('main-content-section');
        expect(section).toBeInTheDocument();
        expect(section).toHaveClass('w-full');
        expect(section).toHaveClass('border');
        expect(section).toHaveClass('border-y-0');
        expect(section).toHaveClass('border-gray-800');
        expect(section).toHaveClass('max-w-full');
        expect(section).toHaveClass('sm:max-w-xl');
        expect(section).toHaveClass('md:max-w-2xl');
        expect(section).toHaveClass('lg:max-w-3xl');

        // Check if the children are rendered inside the section
        const children = screen.getByTestId('test-children');
        expect(children).toBeInTheDocument();
        expect(section).toContainElement(children);
    });

    it('passes children to the section element', () => {
        const testId = 'test-children';
        const testContent = 'Test Children Content';

        render(
            <Main>
                <div data-testid={testId}>{testContent}</div>
            </Main>
        );

        const children = screen.getByTestId(testId);
        expect(children).toBeInTheDocument();
        expect(children).toHaveTextContent(testContent);

        const section = screen.getByTestId('main-content-section');
        expect(section).toContainElement(children);
    });

    it('has a flex container with proper padding', () => {
        render(
            <Main>
                <div>Content</div>
            </Main>
        );

        const flexContainer = screen.getByTestId('main-flex-container');
        expect(flexContainer).toBeInTheDocument();
        expect(flexContainer).toHaveClass('flex');
        expect(flexContainer).toHaveClass('justify-center');
        expect(flexContainer).toHaveClass('px-2');
        expect(flexContainer).toHaveClass('sm:px-4');
    });
});
