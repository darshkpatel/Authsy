import React from "react";
import { getCookie } from 'react-use-cookie';
import {Redirect } from "react-router-dom";
export default function Login() {
    let cookie = null;
    try{
   cookie = JSON.parse(getCookie('JWT'));
    }
    catch(e){
     cookie = null;
    }
  if(cookie) {
    localStorage.setItem('access_token', cookie.accessToken)
    localStorage.setItem('refresh_token', cookie.refreshToken)
  }
  return(
      <>
      {!cookie && <div>Error Authenticating</div>}
      {cookie && <div>Redirecting..<Redirect to={'/dash'}/></div>}
      </>
  )
}
