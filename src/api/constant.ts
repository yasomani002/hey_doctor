// export const BASE_URL = `${window.location.origin}/`
// export const BASE_URL = "http://192.168.149.59:8081/";
export const BASE_URL = import.meta.env.VITE_API_BASEURL;

// API Headers
export const API_HEADERS = {
    AgentName: import.meta.env.VITE_AGENTNAME,
    "X-APIKEY": import.meta.env.VITE_X_APIKEY,
};