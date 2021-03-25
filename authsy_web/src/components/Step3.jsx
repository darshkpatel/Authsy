import React, { useState, useEffect } from 'react';
import SoundGif from '../assets/img/source.gif'
import { totpToken } from "../utils/auth"
import { ToastContainer, toast } from 'react-toastify';

export default function Step3({changeStep}) {
    const [otp, setotp] = useState();
    useEffect(() => {
        if (typeof window.Quiet != "undefined") {
            window.Quiet.init({
                profilesPrefix: "/",
                memoryInitializerPrefix: "/",
                libfecPrefix: "/"
            });
          
        }
        else
            window.location.reload();
        
    // eslint-disable-next-line
    }, [])

    var receiverOnReceive = function (payload) {
        onReceive(payload, recvObj);
    };  
    function startListner(){
        window.Quiet.receiver({
            profile: recvObj.profilename,
            onReceive: receiverOnReceive
        });
        toast('Started Listening for TOTP');
    }
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
        totpToken(recvObj.target).then((res)=>{
            // console.log(res)
            if(res.message==='Verified'){
                toast.success('Verified TOTP Successfully')
                localStorage.setItem('access_token', res.tokens.access.token)
                localStorage.setItem('refresh_token', res.tokens.refresh.token)
                // Move to next step after toast ends
                setTimeout(()=>{changeStep(4)},2000)
            }
            else{
                toast.error('Invalid TOTP')
            }
        })
        setotp(recvObj.target);
    }

    return (
        <div className="container mx-auto px-4">
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

                                {otp?
                                <h6 className="text-gray-600 text-sm font-bold">
                                    Received payload: {otp}
                                </h6>:
                                <h6 className="text-gray-600 text-sm font-bold">
                                    Listening for TOTP
                                </h6>
                                }
                            </div>
                            <img src={SoundGif} alt=".." style={{ width: "100%" }} />
                            <div className="text-center mb-3">
                            <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => {
                        startListner();
                      }}
                    >

                      Receive
                    </button>
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
        </div>
    )
}