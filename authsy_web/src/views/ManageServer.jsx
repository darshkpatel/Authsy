import React, { useEffect, useState } from "react";
import publicIp from 'public-ip';
import { getUser } from "../utils/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.js";
import api from "../utils/api";
import Footer from "../components/Footer";

export default function Login(props) {
  const location = useLocation();
  const ipId = props.match.params.ipId;
  const [user, setUser] = useState();
  const [knockPort, setKnockPort] = useState();
  const port = location.state.port;
  const ip = location.state.ip;
  const [status, setStatus] = useState();
  const [fport, setFport] = useState();
  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line no-use-before-define
      setUser(await getUser());
    };
    fetchData();
  }, []);

  // ToDo: Add Loader while fetching user
  const addPort = async () => {
    const public_ip = await publicIp.v4();
    toast('Knocking port');
    const res = await api.post(`/knock/ip/${ipId}`, {
      knockPort: knockPort,
      port: port,
      clientIP: public_ip,
    });
    setStatus(res.data.STATUS);
    if (status) setFport(res.data.FORWARDING_PORT);
    if (res.data.STATUS === "false") {
      toast.error("Port knocking failed, please try again");
    }
    else {
      toast.success('Knocked port successfully')
    }
  };
  return (
    <>
      <Navbar transparent />
      {user && (
        <main className="profile-page" style={{ minHeight: '92vh' }}>
          <ToastContainer position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false} />
          <section className="relative block" style={{ height: "500px" }}>
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover bg-gray-900"
              style={{
                backgroundImage:
                  "url(" + require("../assets/img/register_bg_2.png") + ")",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
              style={{ height: "70px" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-300 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-32 bg-gray-300">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12 p-4">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                      Send knock packet to {ip}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold">
                      <div className="relative flex w-2/4 justify-center flex items-stretch mb-1 m-auto">
                        <span className="w-full m-auto">Knock server port</span>
                        <input
                          type="text"
                          value={port}
                          disabled
                          className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10 mr-2"
                        />
                        <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3"></span>
                      </div>
                      <div className="relative flex w-2/4 justify-center flex items-stretch mb-1 m-auto">
                        <span className="w-full m-auto">Allow port</span>
                        <select
                          className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10 mr-2"
                          onChange={(e) => setKnockPort(e.target.value)}
                        >
                          <option hidden>Open port</option>
                          <option>8000</option>
                          <option>8080</option>
                          <option>8888</option>
                          <option>8123</option>
                          <option>4444</option>
                        </select>
                        <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3"></span>
                      </div>
                    </div>
                    <div className="mb-2 text-gray-700 mt-3 mb-5">
                      <button
                        onClick={addPort}
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        Knock port
                      </button>
                    </div>
                    <p className="mb-4 text-lg leading-relaxed text-gray-800">
                      {status ? <>
                        Status: {status} <br />
                        {status === "true" ? <>Forwarding Port: {fport}</> : <></>}
                        {status === "false" ? (
                          <>
                            Check if service is running on service on {knockPort}
                          </>
                        ) : (
                          ""
                        )}
                      </> : ""}
                    </p>
                    <div className="mb-2 text-gray-700">
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-gray-300 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-gray-800">
                          Add server and manage ports from one place
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
      <Footer />
    </>
  );
}
