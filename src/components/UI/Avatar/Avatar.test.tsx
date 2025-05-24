import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import Avatar from './Avatar';

describe('Avatar', () => {
    it('renders correctly with required props', () => {
        render(<Avatar username="testuser"/>);
        const avatar = screen.getByAltText("testuser's avatar");
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src', expect.stringContaining('https://ui-avatars.com/api/?name=testuser'));
        expect(avatar.className).toContain('w-10 h-10'); // Default size is 'md'
        expect(avatar.className).toContain('rounded-full');
    });

    it('uses provided avatarUrl when available', () => {
        const avatarUrl = 'https://example.com/avatar.jpg';
        render(<Avatar username="testuser" avatarUrl={avatarUrl}/>);
        const avatar = screen.getByAltText("testuser's avatar");
        expect(avatar).toHaveAttribute('src', avatarUrl);
    });

    it('uses fallback URL when avatarUrl is empty string', () => {
        render(<Avatar username="testuser" avatarUrl=""/>);
        const avatar = screen.getByAltText("testuser's avatar");
        expect(avatar).toHaveAttribute('src', expect.stringContaining('https://ui-avatars.com/api/?name=testuser'));
    });

    it('applies small size class when size is sm', () => {
        render(<Avatar username="testuser" size="sm"/>);
        const avatar = screen.getByAltText("testuser's avatar");
        expect(avatar.className).toContain('w-8 h-8');
    });

    it('applies large size class when size is lg', () => {
        render(<Avatar username="testuser" size="lg"/>);
        const avatar = screen.getByAltText("testuser's avatar");
        expect(avatar.className).toContain('w-12 h-12');
    });

    it('applies custom className when provided', () => {
        render(<Avatar username="testuser" className="custom-class"/>);
        const avatar = screen.getByAltText("testuser's avatar");
        expect(avatar.className).toContain('custom-class');
    });

    it('encodes username with special characters in fallback URL', () => {
        render(<Avatar username="test user with spaces"/>);
        const avatar = screen.getByAltText("test user with spaces's avatar");
        expect(avatar).toHaveAttribute('src', expect.stringContaining('https://ui-avatars.com/api/?name=test%20user%20with%20spaces'));
    });
});
