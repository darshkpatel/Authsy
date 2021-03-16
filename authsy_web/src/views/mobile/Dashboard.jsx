import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../../components/Navbar.js";
import FooterSmall from "../../components/FooterSmall.js";
import { isAuthenticated, getUser, setMobileConfigured, checkStorageSet } from "../../utils/auth";
import api from "../../utils/api"
import { totp } from "../../utils/totp"

export default function Login() {
  const [user, setUser] = useState();
  const [isLoggedIn, setLogin] = useState()
  const [key, setKey] = useState(localStorage.getItem('sharedKey'))
  const [TOTP, setTOTP] = useState(null)

  /* eslint-disable */

  // Auth & Key
  useEffect(() => {
    const fetchData = async () => {
      setLogin(await isAuthenticated());
      setUser(await getUser());
      setTOTP(key ? totp.gen(key) : null);
    };
    fetchData();
  }, []);

  // OTP Update
  useEffect(() => {
    const timer = setInterval(() => key && updateOTP(), 10000)
    return () => clearInterval(timer)
  }, [key, updateOTP])

  function updateOTP() {
    if (key) {
      let _otp = totp.gen(key);
      setTOTP(_otp);
      console.log("OTP Refresh: " + _otp);
    }
    else {
      console.error("No KEY Stored, Cannot update OTP")
    }
  }
  /* eslint-enable */

  console.log({ user })
  console.log({ isLoggedIn })

  if (!checkStorageSet()) {
    return <Redirect to="/login" />
  }

  if (user && !user.keyGenerated) {
    // Means user signed up from mobile
    return <Redirect to="/flowError" />
  }

  if (user && user.keyGenerated && !user.mobileConfigured) {
    api.get(`/auth/key`).then((response) => {
      if (response.status === 200 && response.data.key) {
        localStorage.setItem('sharedKey', response.data.key)
        setKey(response.data.key)
        setTOTP(totp.gen(response.data.key))
        setMobileConfigured()
      }
    })
  }

  if (typeof window.Quiet != "undefined") {
    window.Quiet.init({
      profilesPrefix: "/",
      memoryInitializerPrefix: "/",
      libfecPrefix: "/"
    });
  }
  else
    window.location.reload();


  function sendOTP() {
    var payload = TOTP;
    var transmit = window.Quiet.transmitter({ profile: "audible" });
    transmit.transmit(window.Quiet.str2ab(payload));

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
                "url(" + require("../../assets/img/register_bg_2.png") + ")",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <h1>MOBILE VIEW</h1>
                    {
                      process.env.NODE_ENV === 'development' &&
                      <><h2>(dev) sharedKey: {key}</h2>
                        <h2>TOTP: {TOTP}</h2></>
                    }

                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => {
                        sendOTP();
                      }}
                    >
                      Verify Login
                    </button>
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
