import React from 'react';
import SuccessGif from '../assets/img/success.gif';
import { Link } from "react-router-dom";

export default function Step4() {
    return (
        <div className="container mx-auto px-4">
            <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center mb-3">
                                <h6 className="text-gray-600 text-sm font-bold">
                                    Successfully Added Device
                                </h6>
                            </div>
                            <img src={SuccessGif} alt=".." style={{ width: "100%" }} />
                            <div className="text-center mb-3">
                                <Link to="/dashboard">
                                    <button
                                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                    >

                                        Go to Dashboard
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}