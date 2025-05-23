# Testing Strategy for Tuiter

This document outlines the testing strategy for the Tuiter project, including tools, patterns, and best practices.

## Testing Tools

- **Vitest**: Main testing framework, compatible with Vite
- **React Testing Library**: For testing React components
- **@testing-library/user-event**: For simulating user interactions
- **@testing-library/jest-dom**: For additional DOM matchers
- **@vitest/coverage-v8**: For test coverage reporting
- **@vitest/ui**: For visual test runner

## Test Directory Structure

Tests are organized following the same structure as the source code:

```
src/
├── components/
│   └── ComponentName/
│       ├── ComponentName.tsx
│       └── __tests__/
│           └── ComponentName.test.tsx
├── hooks/
│   └── hookName/
│       ├── hookName.ts
│       └── __tests__/
│           └── hookName.test.ts
└── test/
    ├── setup.ts       # Global test setup
    ├── utils.tsx      # Test utilities
    └── mocks/         # Common mocks
```

## Running Tests

The following npm scripts are available:

- `yarn test`: Run all tests once
- `yarn test:watch`: Run tests in watch mode
- `yarn test:ui`: Run tests with the Vitest UI
- `yarn test:coverage`: Run tests with coverage reporting

## Testing Patterns

### Components

For testing components, follow these patterns:

1. **Render Testing**: Test that components render correctly
2. **Interaction Testing**: Test user interactions using `@testing-library/user-event`
3. **State Testing**: Test that component state changes correctly
4. **Props Testing**: Test that components respond correctly to different props
5. **Error Testing**: Test error handling

Example:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import { LoginForm } from '../LoginForm';

describe('LoginForm', () => {
  it('renders correctly', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('submits form with user data', async () => {
    const onSubmit = vi.fn();
    const { user } = render(<LoginForm onSubmit={onSubmit} />);
    
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });
});
```

### Hooks

For testing hooks, follow these patterns:

1. **Return Value Testing**: Test that hooks return the expected values
2. **State Update Testing**: Test that hooks update state correctly
3. **Side Effect Testing**: Test that hooks perform side effects correctly
4. **Error Testing**: Test error handling

Example:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });
});
```

### API Services

For testing API services, follow these patterns:

1. **Mock Axios/Fetch**: Use Vitest to mock API calls
2. **Response Testing**: Test handling of different API responses
3. **Error Testing**: Test error handling

Example:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { getUserData } from '../userService';
import axios from 'axios';

vi.mock('axios');

describe('userService', () => {
  it('fetches user data successfully', async () => {
    const mockData = { id: 1, name: 'Test User' };
    (axios.get as any).mockResolvedValueOnce({ data: mockData });
    
    const result = await getUserData(1);
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('/api/users/1');
  });

  it('handles errors', async () => {
    (axios.get as any).mockRejectedValueOnce(new Error('Network error'));
    
    await expect(getUserData(1)).rejects.toThrow('Network error');
  });
});
```

## Mocking

### Common Mocks

- **API Calls**: Mock axios or fetch
- **Context Providers**: Create test providers
- **Local Storage**: Mock localStorage
- **Router**: Use MemoryRouter for testing

### Example: Mocking Context

```tsx
// In test/utils.tsx
const TestAuthProvider = ({ children, user = null }) => {
  return (
    <AuthContext.Provider value={{ user, login: vi.fn(), logout: vi.fn() }}>
      {children}
    </AuthContext.Provider>
  );
};

const customRender = (ui, { user = null, ...options } = {}) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <TestAuthProvider user={user}>{children}</TestAuthProvider>
    ),
    ...options,
  });
};
```

## Test Coverage Goals

- **Components**: 80% coverage
- **Hooks**: 90% coverage
- **Services**: 90% coverage
- **Utils**: 95% coverage

Focus on testing:
1. Critical user flows
2. Complex business logic
3. Error handling
4. Edge cases

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the code does, not how it does it
2. **Use Testing Library Queries Correctly**: Prefer `getByRole`, `getByLabelText`, etc. over `getByTestId`
3. **Keep Tests Independent**: Each test should be able to run independently
4. **Mock External Dependencies**: Don't rely on external services in tests
5. **Use Act for State Updates**: Wrap state updates in `act()`
6. **Test Accessibility**: Ensure components are accessible
7. **Keep Tests Fast**: Optimize tests for speed
8. **Write Clear Test Descriptions**: Use descriptive test names
