import React from "react";
import { getCookie } from 'react-use-cookie';
import {Redirect } from "react-router-dom";
export default function Login() {
    let cookie = null;
    let alreadySignedUp = localStorage.getItem('signed_up') || false;
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
  }
  return(
      <>
      {!cookie && <div>Error Authenticating</div>}
      {cookie && !alreadySignedUp && <div>Redirecting..<Redirect to={'/addDevice'}/></div>}
      {cookie && alreadySignedUp && <div>Redirecting..<Redirect to={'/dash'}/></div>}
      </>
  )
}
