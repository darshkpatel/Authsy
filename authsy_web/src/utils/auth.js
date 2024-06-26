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

export const setMobileConfigured = async () => {
    return await (await api.post(`/auth/mobileConfigured`)).data
}

export const generateKey = async () => {
    return await (await api.post(`/auth/totp-setup`)).data
}

export const totpToken = async (totp) => {
    return (await api.post(`/auth/totp-token`, {totp})).data
}

export const checkStorageSet = () => {
    return localStorage.getItem('access_token') ? true : false;
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
export const isAuthenticated2fa = async () => {
    let status = false;
    try{
     status =  await (await api.get('/auth/2fa/verify')).data.valid ?? false;
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
        window.location.href = `/login`;
    }
    return;
}
