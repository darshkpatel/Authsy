import React from 'react';
import SoundGif from '../assets/img/source.gif'

export default function Step3() {
    return (
        <div className="container mx-auto px-4" style={{marginTop: '20%'}}>
            <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center mb-3">
                                <h6 className="text-gray-600 text-sm font-bold">
                                    Transmitting sound
                                </h6>
                            </div>
                            <img src={SoundGif} alt=".." style={{ width: "100%" }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}