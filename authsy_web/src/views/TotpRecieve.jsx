import React from 'react';

import FooterSmall from "../components/FooterSmall.js";
import Navbar from "../components/Navbar.js";
import SoundGif from '../assets/img/source.gif'

export default function TotpRecieve() {
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
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div className="text-center mb-3">
                                            <h6 className="text-gray-600 text-sm font-bold">
                                                Receiving sound
                                </h6>

                                            <h6 className="text-gray-600 text-sm font-bold">
                                                Received payload:
                                </h6>
                                        </div>
                                        <img src={SoundGif} alt=".." style={{ width: "100%" }} />
                                        <div className="text-center mb-3">
                                            <button
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
                    <FooterSmall absolute />
                </section>
            </main>
        </>
    )
}