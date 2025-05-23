import { vi } from 'vitest';

// Mock API handlers for testing
// These can be used with MSW (Mock Service Worker) if added to the project

// Example API response mocks
export const mockUserResponse = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  name: 'Test User',
  bio: 'This is a test user',
  avatar: 'https://example.com/avatar.jpg'
};

export const mockPostsResponse = [
  {
    id: '1',
    content: 'This is a test post',
    author: 'testuser',
    createdAt: '2023-01-01T00:00:00.000Z',
    likes: 10,
    comments: 5
  },
  {
    id: '2',
    content: 'Another test post',
    author: 'testuser',
    createdAt: '2023-01-02T00:00:00.000Z',
    likes: 5,
    comments: 2
  }
];

// Mock API functions
export const mockApiCalls = {
  getUser: vi.fn().mockResolvedValue(mockUserResponse),
  getPosts: vi.fn().mockResolvedValue(mockPostsResponse),
  createPost: vi.fn().mockImplementation((content) =>
    Promise.resolve({
      id: '3',
      content,
      author: 'testuser',
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0
    })
  ),
  likePost: vi.fn().mockImplementation((id) =>
    Promise.resolve({
      success: true,
      post: {
        ...mockPostsResponse.find(post => post.id === id),
        likes: (mockPostsResponse.find(post => post.id === id)?.likes || 0) + 1
      }
    })
  ),
  login: vi.fn().mockResolvedValue({
    token: 'mock-token',
    user: mockUserResponse
  }),
  register: vi.fn().mockResolvedValue({
    token: 'mock-token',
    user: mockUserResponse
  })
};

// Mock localStorage
export const mockLocalStorage = () => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
};
