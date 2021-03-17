import React from "react";
import { getCookie, setCookie } from 'react-use-cookie';
import {Redirect } from "react-router-dom";
import { useMedia } from 'react-use';

export default function Login() {
    let cookie = null;
    const alreadySignedUp = localStorage.getItem('signed_up') || false;
    const isDesktop = useMedia('(min-width: 700px)');
  
    try{
   cookie = JSON.parse(getCookie('JWT'));
    }
    catch(e){
     cookie = null;
    }
  if(cookie) {
    localStorage.setItem('access_token', cookie.accessToken)
    localStorage.setItem('refresh_token', cookie.refreshToken)
    localStorage.setItem('signed_up', true)
    setCookie('JWT', ''); // Clear Stored cookie as data stored in local storage
  }
  if(isDesktop)
  return(<>
      {!cookie && <div>Error Authenticating</div>}
      {cookie && !alreadySignedUp && <div>Redirecting..<Redirect to={'/addDevice'}/></div>}
      {cookie && alreadySignedUp && <div>Redirecting..<Redirect to={'/auth2FA'}/></div>}
      </>)

  else
  return(<>
    {!cookie && <div>Error Authenticating</div>}
    {cookie && <div>Redirecting..<Redirect to={'/mobile'}/></div>}
    </>)
}
