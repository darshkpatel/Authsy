import React from 'react';
import QRCode from '../assets/img/qrcode.png';

export default function Step2() {
    return (
        <div className="container mx-auto px-4 h-50" style={{marginTop: '20%'}}>
            <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center mb-3">
                                <h6 className="text-gray-600 text-sm font-bold">
                                    Scan the qr code on your phone
											</h6>
                            </div>
                            <img src={QRCode} alt=".." style={{ width: "100%" }} />
                            <div className="text-center">
                            <u><b>https://authsy.darshkpatel.com/mobile</b></u>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}