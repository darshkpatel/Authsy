import React, { useState } from "react";

import Navbar from "../components/Navbar.js";
import FooterSmall from "../components/FooterSmall.js";
import Steps from '../components/Steps.js';

import Step2 from '../components/Step2.jsx';
import Step3 from '../components/Step3.js';
import Step4 from '../components/Step4.js';

export default function AddDevice() {
	const [step, setStep] = useState(2);
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
					<Steps step={step} />

					{step === 2 ? <Step2 /> : step === 3 ? <Step3 /> : <Step4 />}

					<div className="flex content-center items-center justify-center">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded z-10" onClick={() => setStep(step + 1)}>Next</button>
					</div>

					<FooterSmall absolute />
				</section>
			</main>
		</>
	);
}
