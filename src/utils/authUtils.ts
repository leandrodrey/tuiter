let currentToken: string | null = null;

export const setHttpAuthToken = (token: string | null): void => {
    currentToken = token;
};

export const getHttpAuthToken = (): string | null => {
    return currentToken;
};
