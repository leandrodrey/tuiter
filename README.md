# Tuiter - A Twitter-like Application

This is a Twitter-like application built with React, TypeScript, and Vite.

## Features

- User authentication
- Post creation and viewing
- User profiles
- Favorites system
- Responsive design

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: React Context API
- **Form Handling**: Formik, Yup
- **Routing**: React Router
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library

## Development

### Installation

```bash
# Install dependencies
yarn install
```

### Running the Application

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## Testing

This project uses Vitest and React Testing Library for testing. A comprehensive testing strategy has been implemented to ensure code quality and reliability.

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with UI
yarn test:ui

# Run tests with coverage
yarn test:coverage
```

### Testing Strategy

The project follows a structured testing approach:

1. **Component Tests**: Testing UI components for correct rendering and behavior
2. **Hook Tests**: Testing custom hooks for correct state management and side effects
3. **Service Tests**: Testing API services and other utilities

For more details, see the [Testing Strategy Document](src/test/TESTING_STRATEGY.md).

### Test Directory Structure

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
