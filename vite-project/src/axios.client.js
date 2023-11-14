import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCSESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('ACCSESS_TOKEN');
        }

        throw error;
    }
);

export default axiosClient;
