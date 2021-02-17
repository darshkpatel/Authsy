import api from './api'
export const getJWTUser = () => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
        const tokenParts = JSON.parse(atob(accessToken.split('.')[1]));
        return tokenParts.sub ?? null;
    }
    else {
        return;
    }
}

export const getUser = async () => {
    const user = getJWTUser();
    return user ? await (await api.get(`/users/${user}`)).data : null;
}
export const isAuthenticated = async () => {
    let status = false;
    try{
     status =  await (await api.get('/auth/verify')).data.valid ?? false;
    }
    catch{
        status = false;
    }
    return status;
}