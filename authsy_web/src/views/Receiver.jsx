import React, { useState } from "react";

import Navbar from "../components/Navbar.js";
import FooterSmall from "../components/FooterSmall.js";

export default function Login() {
  const [otp, setotp] = useState("");

  window.Quiet.init({
    profilesPrefix: "/",
    memoryInitializerPrefix: "/",
    libfecPrefix: "/"
  });
  var profilename = "audible";
  var recvObj = {
    profilename,
    otp,
    content: new ArrayBuffer(0)
  };

  function onReceive(recvPayload, recvObj) {
    recvObj.content = window.Quiet.mergeab(recvObj.content, recvPayload);
    recvObj.target = window.Quiet.ab2str(recvObj.content);
    setotp(recvObj.target);
  }

  function onClear() {
    setotp("");
  }

  function receiveOTP(e) {
    var receiverOnReceive = function(payload) {
      onReceive(payload, recvObj);
    };
    window.Quiet.receiver({
      profile: recvObj.profilename,
      onReceive: receiverOnReceive
    });
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
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"></div>
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => {
                        receiveOTP();
                      }}
                    >
                      
                      Receive OTP
                    </button>
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => {
                        onClear();
                      }}
                    >
                      Clear OTP
                    </button>
                    Received payload: {otp}
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
