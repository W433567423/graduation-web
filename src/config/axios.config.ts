const devBaseURL = 'http://localhost:8004'
const proBaseURL = 'https://ag.wtututu.top'
export const BASE_URL = import.meta.env.MODE === 'development' ? devBaseURL : proBaseURL

export const TIMEOUT = 5000
