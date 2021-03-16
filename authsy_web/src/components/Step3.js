import React, { useState, useEffect, useRef } from 'react';
import SoundGif from '../assets/img/source.gif'

export default function Step3() {
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
            }, 1000)
            
        }
        else
            window.location.reload();
        

        // Cleanup
        return () => {
            if (typeof window.Quiet != "undefined") {
                reciever.current.destroy();
            }
        }
    }, [])

    var profilename = "audible";
    var recvObj = {
        profilename,
        otp,
        content: new ArrayBuffer(0)
    };

    function onReceive(recvPayload, recvObj) {
        recvObj.content = window.Quiet.mergeab(recvObj.content, recvPayload);
        recvObj.target = window.Quiet.ab2str(recvObj.content);
        console.log('Recieved TOTP: ' + recvObj.target);
        onClear();
        setotp(recvObj.target);
    }

      function onClear() {
        setotp("");
      }

    function receiveOTP(e) {        
  
    }
    return (
        <div className="container mx-auto px-4">
            <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center mb-3">
                                <h6 className="text-gray-600 text-sm font-bold">
                                    Receiving sound
                                </h6>

                                <h6 className="text-gray-600 text-sm font-bold">
                                    Received payload: {otp}
                                </h6>
                            </div>
                            <img src={SoundGif} alt=".." style={{ width: "100%" }} />
                            <div className="text-center mb-3">
                                <button onClick={() => { receiveOTP() }}
                                    id="startbtn"
                                    className="bg-gray-900 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                >
                                    start
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}