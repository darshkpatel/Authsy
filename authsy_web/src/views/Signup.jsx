import React from "react";

import Navbar from "../components/Navbar.js";
import FooterSmall from "../components/FooterSmall.js";
import Steps from '../components/Steps.js';

import { Link } from "react-router-dom";

export default function Signup() {
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
          <Steps step={1} />
          <div className="container mx-auto px-4">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <b>Sign up steps:</b>
                    <ul>
                      <li>Login with your google account</li>
                      <li>Scan the QR code in step 2 to open the mobile webiste</li>
                      <li>Click on recieve to listen to the TOTP transmitted by your mobile device</li>
                      <li>Success</li>
                    </ul>
                    <hr className="border-gray-400 mt-2" />
                    <div className="text-center mb-3">
                    </div>
                    <div className="btn-wrapper text-center">
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={(e) => {
                          // e.preventDefault();
                          window.location.href = process.env.REACT_APP_BASE_URL + `/auth/google`;
                        }}
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          src={require("../assets/img/google.svg")}
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