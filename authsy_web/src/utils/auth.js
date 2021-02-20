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

export const handleLogout = async () => {
    const isLoggedIn = await isAuthenticated();
    if(isLoggedIn) {
        localStorage.removeItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        await api.post(`/auth/logout`, { refreshToken });
        window.location.href = `${window.location.hostname}/login`;
    }
    return;
}

export const generateKey = async () => {
    const user = getJWTUser();
    return user ? await (await api.post(`/auth/totp-setup`)).data : null;
}