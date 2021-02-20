import React, { useState, useEffect } from "react";
// import { Redirect } from "react-router-dom";
import Navbar from "../../components/Navbar.js";
import FooterSmall from "../../components/FooterSmall.js";
// import { isAuthenticated } from "../../utils/auth";

export default function MobileLogin() {
  const [isLoggedIn, setLogin] = useState();
  useEffect(() => {
    const checkLogin = async () => {
      // eslint-disable-next-line no-use-before-define
      //   setLogin(await isAuthenticated())
    };
    checkLogin();
  }, []);
  console.log({ isLoggedIn });
  //   if(isLoggedIn){
  //     return <Redirect to="/mobile" />
  //   }
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
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Sign in with
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          src={require("../../assets/img/github.svg")}
                        />
                        Github
                      </button>
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={e => {
                          // e.preventDefault();
                          window.location.href =
                            process.env.REACT_APP_BASE_URL + `/auth/google`;
                        }}
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          src={require("../../assets/img/google.svg")}
                        />
                        Google
                      </button>
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
