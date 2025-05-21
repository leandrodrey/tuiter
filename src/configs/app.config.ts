export type AppConfig = {
    apiPrefix: string
    authToken: string
}

const appConfig: AppConfig = {
    apiPrefix: import.meta.env.VITE_API_BASE_URL || 'https://tuiter.fragua.com.ar/api/v1',
    authToken: import.meta.env.VITE_AUTH_TOKEN || '',
}

export default appConfig
