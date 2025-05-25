import { describe, it, expect, beforeEach } from 'vitest';
import { setHttpAuthToken, getHttpAuthToken } from './authUtils';

describe('authUtils', () => {
  // Reset the token before each test
  beforeEach(() => {
    setHttpAuthToken(null);
  });

  it('should initially return null', () => {
    expect(getHttpAuthToken()).toBeNull();
  });

  it('should set and get the token correctly', () => {
    const testToken = 'test-token';
    setHttpAuthToken(testToken);
    expect(getHttpAuthToken()).toBe(testToken);
  });

  it('should update the token when set multiple times', () => {
    const firstToken = 'first-token';
    const secondToken = 'second-token';

    setHttpAuthToken(firstToken);
    expect(getHttpAuthToken()).toBe(firstToken);

    setHttpAuthToken(secondToken);
    expect(getHttpAuthToken()).toBe(secondToken);
  });

  it('should clear the token when set to null', () => {
    const testToken = 'test-token';

    setHttpAuthToken(testToken);
    expect(getHttpAuthToken()).toBe(testToken);

    setHttpAuthToken(null);
    expect(getHttpAuthToken()).toBeNull();
  });
});
