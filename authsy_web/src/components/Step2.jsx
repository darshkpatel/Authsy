import React, { useEffect } from 'react';
import QRCode from '../assets/img/qrcode.png';
import { generateKey } from "../utils/auth"

export default function Step2() {
    useEffect(() => {
        const genKey = async () => {
            // eslint-disable-next-line no-use-before-define
            const resp = await generateKey()
            console.log({ resp })
        };
        genKey();
    }, []);
    return (
        <div className="container mx-auto px-4 h-50">
            <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center mb-3">
                                <h6 className="text-blue-600 text-md font-bold">Setup 2FA on Phone</h6>
                                <h6 className="text-gray-600 text-sm">Visit: <u><b>{process.env.REACT_APP_FRONTEND_URL}</b></u></h6>
                                <h6 className="text-gray-600 text-sm font-bold">OR</h6>
                                <h6 className="text-gray-600 text-sm">Scan this url to open mobile app</h6>
                            </div>
                            <img src={QRCode} alt=".." style={{ width: "100%" }} />
                            <div className="text-center">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}