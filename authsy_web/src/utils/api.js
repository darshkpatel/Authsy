import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 5000,
    headers: {
        'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});


//Refresh Token if Stale
api.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && (originalRequest.url === '/auth/refresh-tokens')) {
            if (window.location.pathname !== '/login') window.location.href = '/login';
            return Promise.reject(error);
        }
        if (error.response.status === 401 && (originalRequest.url.includes('2fa'))) {
            if (window.location.pathname !== '/auth2FA') window.location.href = '/auth2FA';
            return Promise.reject(error);
        }
        if (error.response.data.code === 401) {
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);

                if (tokenParts.exp > now) {
                    return api
                        .post('/auth/refresh-tokens', { refreshToken })
                        .then((response) => {

                            localStorage.setItem('access_token', response.data.access.token);
                            localStorage.setItem('refresh_token', response.data.refresh.token);

                            api.defaults.headers['Authorization'] = "Bearer " + response.data.access.token;
                            originalRequest.headers['Authorization'] = "Bearer " + response.data.access.token;

                            return api(originalRequest);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                } else {
                    if (window.location.pathname !== '/login') window.location.href = '/login';
                }
            } else {
                console.log("Refresh token not available.")
                // window.location.href = '/login';
            }
        }


        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);

export default api;