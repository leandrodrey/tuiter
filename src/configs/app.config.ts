export type AppConfig = {
    apiPrefix: string
    authToken: string
}

const appConfig: AppConfig = {
    apiPrefix: import.meta.env.VITE_API_BASE_URL,
    authToken: import.meta.env.VITE_AUTH_TOKEN || '',
}

export default appConfig
