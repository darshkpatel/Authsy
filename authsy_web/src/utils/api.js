import 'axios';
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
       if (error.response.status === 401 && originalRequest.url === baseURL+'v1/auth/refresh-tokens/') {
           window.location.href = '/login/';
           return Promise.reject(error);
       }

       if (error.response.data.code === 401) 
           {
               const refreshToken = localStorage.getItem('refresh_token');

               if (refreshToken){
                   const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                   // exp date in token is expressed in seconds, while now() returns milliseconds:
                   const now = Math.ceil(Date.now() / 1000);
                   console.log(tokenParts.exp);

                   if (tokenParts.exp > now) {
                       return axiosInstance
                       .post('/v1/auth/refresh-tokens', {refresh: refreshToken})
                       .then((response) => {
           
                           localStorage.setItem('access_token', response.data.access.token);
                           localStorage.setItem('refresh_token', response.data.refresh.token);
           
                           axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access.token;
                           originalRequest.headers['Authorization'] = "Bearer " + response.data.access.token;
           
                           return axiosInstance(originalRequest);
                       })
                       .catch(err => {
                           console.log(err)
                       });
                   }else{
                       console.log("Refresh token is expired", tokenParts.exp, now);
                       window.location.href = '/login';
                   }
               }else{
                   console.log("Refresh token not available.")
                   window.location.href = '/login';
               }
       }
     
    
     // specific error handling done elsewhere
     return Promise.reject(error);
 }
);

export default api;