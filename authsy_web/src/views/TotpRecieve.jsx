import React, { useState, useEffect, useRef } from 'react';
import FooterSmall from "../components/FooterSmall.js";
import Navbar from "../components/Navbar.js";
import SoundGif from '../assets/img/source.gif'
import { totpToken } from "../utils/auth"
import { ToastContainer, toast } from 'react-toastify';
import {Redirect } from "react-router-dom";

export default function TotpRecieve() {
    const [otp, setotp] = useState();
    let reciever = useRef();
    useEffect(() => {
        if (typeof window.Quiet != "undefined") {
            window.Quiet.init({
                profilesPrefix: "/",
                memoryInitializerPrefix: "/",
                libfecPrefix: "/"
            });

            var receiverOnReceive = function (payload) {
                onReceive(payload, recvObj);
            };

            setTimeout(() => {
                reciever.current = window.Quiet.receiver({
                    profile: recvObj.profilename,
                    onReceive: receiverOnReceive
                });
            }, 2000)

        }
        else
            window.location.reload();


        // Cleanup
        return () => {
            if (typeof window.Quiet != "undefined" && reciever.current) {
                reciever.current.destroy();
            }
        }
        // eslint-disable-next-line
    }, [])

    var profilename = "audible";
    var recvObj = {
        profilename,
        otp,
        content: new ArrayBuffer(0)
    };

    function onReceive(recvPayload, recvObj) {
        // recvObj.content = window.Quiet.mergeab(recvObj.content, recvPayload);
        recvObj.target = window.Quiet.ab2str(recvPayload);
        console.log('Recieved TOTP: ' + recvObj.target);
        totpToken(recvObj.target).then((res) => {
            // console.log(res)
            if (res.message === 'Verified') {
                toast.success('Verified TOTP Successfully')
                localStorage.setItem('access_token', res.tokens.access.token)
                localStorage.setItem('refresh_token', res.tokens.refresh.token)
                // Move to next step after toast ends
                setTimeout(()=>{window.location.href = '/dash'},2000)
                
            }
            else {
                toast.error('Invalid TOTP')
            }
        })
        setotp(recvObj.target);
    }



      const tokenParts = JSON.parse(atob(localStorage.getItem('access_token').split('.')[1]));
      const now = Math.ceil(Date.now() / 1000);
      if(tokenParts.type==='access2fa' && tokenParts.exp > now){
        console.log('Access Token 2FA Verified');

        return (<div>Redirecting..<Redirect to={'/dash'}/></div>)
      }

    return (
        <>
            <Navbar transparent />
            <main>
                <section className="absolute w-full" style={{ minHeight: '100vh' }}>
                    <div
                        className="absolute top-0 w-full h-full bg-gray-900"
                        style={{
                            backgroundImage:
                                "url(" + require("../assets/img/register_bg_2.png") + ")",
                            backgroundSize: "100%",

                        }}
                    ></div>
                    <div className="container mx-auto px-4 mt-20">
                        <div className="flex content-center items-center justify-center h-full">
                            <ToastContainer position="top-right"
                                autoClose={2000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss={false}
                                draggable
                                pauseOnHover={false} />
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div className="text-center mb-3">
                                            <h6 className="text-gray-600 text-sm font-bold">
                                                Please Verify TOTP From your phone
                                </h6>

                                            {otp ?
                                                <h6 className="text-gray-600 text-sm font-bold">
                                                    Received payload: {otp}
                                                </h6> :
                                                <h6 className="text-gray-600 text-sm font-bold">
                                                    Listening for TOTP
                                </h6>
                                            }
                                        </div>
                                        <img src={SoundGif} alt=".." style={{ width: "100%" }} />
                                        <div className="text-center mb-3">
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
    )
}