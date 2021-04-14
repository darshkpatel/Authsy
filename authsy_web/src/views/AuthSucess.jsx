import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useMedia } from 'react-use';

// A custom hook that builds on useLocation to parse querystring
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Login() {
  let query = useQuery();

  let accessToken = query.get("accessToken");
  let refreshToken = query.get("refreshToken");
  let gotParams = false;
  const alreadySignedUp = localStorage.getItem('signed_up') || false;
  const isDesktop = useMedia('(min-width: 700px)');

  if (accessToken && refreshToken) {
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)
    localStorage.setItem('signed_up', true)
    gotParams = true;
  }
  if (isDesktop)
    return (<>
      {!gotParams && <div>Error Authenticating</div>}
      {gotParams && !alreadySignedUp && <div>Redirecting..<Redirect to={'/addDevice'} /></div>}
      {gotParams && alreadySignedUp && <div>Redirecting..<Redirect to={'/auth2FA'} /></div>}
    </>)

  else
    return (<>
      {!gotParams && <div>Error Authenticating</div>}
      {gotParams && <div>Redirecting..<Redirect to={'/mobile'} /></div>}
    </>)
}
