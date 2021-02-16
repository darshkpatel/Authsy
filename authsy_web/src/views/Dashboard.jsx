import React from "react";

import Navbar from "../components/Navbar.js";
import FooterSmall from "../components/FooterSmall.js";
import { getCookie } from 'react-use-cookie';

export default function Login() {
  const cookie = JSON.parse(getCookie('JWT'));
  if(cookie) {
    localStorage.setItem('access_token', cookie.accessToken)
    localStorage.setItem('refresh_token', cookie.refreshToken)
  }
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900"
            style={{
              backgroundImage:
                "url(" + require("../assets/img/register_bg_2.png") + ")",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <h1>Dashboard</h1>
                  <div>
                    {JSON.stringify(cookie)}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
