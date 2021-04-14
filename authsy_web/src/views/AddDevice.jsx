import React, { useState, useEffect } from "react";

import Navbar from "../components/Navbar.js";
import FooterSmall from "../components/FooterSmall.js";
import Steps from '../components/Steps.js';

import Step2 from '../components/Step2.jsx';
import Step3 from '../components/Step3.jsx';
import Step4 from '../components/Step4.jsx';

export default function AddDevice() {
	const [step, setStep] = useState(2);
	const [width, setWidth] = useState(1920);
	useEffect(() => {
		window.addEventListener("resize", setWidth(window.innerWidth));
	}, [width])
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
					<Steps step={step} />
					<div style={{ marginTop: '20px' }}>
						{step === 2 ? <Step2 /> : step === 3 ? <Step3 changeStep={setStep} /> : <Step4 />}
					</div>
					{step === 2 &&
						<div className="flex content-center items-center justify-center pb-20">
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded z-10" onClick={() => setStep(step + 1)}>Next</button>
						</div>
					}

					<FooterSmall absolute />
				</section>
			</main>
		</>
	);
}
