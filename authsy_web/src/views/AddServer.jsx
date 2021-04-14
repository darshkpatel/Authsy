import React, { useEffect, useState } from "react";
import { getJWTUser, getUser } from "../utils/auth";
import Navbar from "../components/Navbar.js";
import api from "../utils/api";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Footer from "../components/Footer";
export default function Login() {
  const router = useHistory();
  const [user, setUser] = useState();
  const [protectedData, setProtectedData] = useState();
  const [ip, setIP] = useState("");
  const [ipList, setIPList] = useState([]);
  const [port, setPort] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line no-use-before-define
      setUser(await getUser());
      setProtectedData(await (await api.get("/auth/2fa/protected_route")).data);
      setIPList(await (await api.get("/knock/" + getJWTUser())).data);
    };

    fetchData();
  }, []);
  console.log(protectedData);
  // ToDo: Add Loader while fetching user
  const handleServerAdd = async () => {
    if (port === "" || ip === "") {
      toast("Please select a valid IP and port.")
    }
    else {
      try {
        const res = await api.post("/knock/" + getJWTUser(), {
          IPAddress: ip,
          port: port
        });
        if (res.statusText === "Created") {
          console.log("ran");
          setIPList(await (await api.get("/knock/" + getJWTUser())).data);
          toast("Added server");
        }
      }
      catch (e) {
        toast(e.response.data.message);
      }
    }
  };
  const managePorts = server => {
    router.push(`/manageServer/${server.id}`, {
      ip: server.IPAddress,
      port: server.port
    });
  };
  const DeleteServer = async id => {
    console.log(getJWTUser());
    const res = await api.delete("/knock/ip/" + id);
    console.log(res);
    if (res.status === 204) {
      setIPList(await (await api.get("/knock/" + getJWTUser())).data);
    }
  };

  return (
    <>
      <Navbar transparent />
      {user && (
        <main className="profile-page">
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
                        {/* <img
                        alt="..."
                        src={require("assets/img/darsh.png").default}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: "150px" }}
                      /> */}
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                      Add Server
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold">
                      <div className="relative flex w-2/4 justify-center items-stretch mb-1 m-auto">
                        <span className="w-full m-auto">IP address</span>
                        <input
                          type="text"
                          onChange={e => setIP(e.target.value)}
                          placeholder="IP Address"
                          className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10 mr-2"
                        />
                        <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3"></span>
                      </div>
                      <div className="relative flex w-2/4 justify-center items-stretch mb-1 m-auto">
                        <span className="w-full m-auto">Knock server port</span>
                        <input
                          type="number"
                          onChange={e => setPort(e.target.value)}
                          placeholder="Knock server port"
                          className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10 mr-2"
                        />
                        <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3"></span>
                      </div>
                    </div>
                    <div className="mb-2 text-gray-700 mt-3 mb-5">
                      <button
                        onClick={handleServerAdd}
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        Add
                      </button>
                    </div>
                    <div className="mb-2 text-gray-700">
                      {ipList.length > 0 ?
                        <>
                          <table className="table-fixed m-auto border-collapse border border-blue-800">
                            <thead>
                              <tr>
                                <th className="w-1/2 border border-blue-800">IP</th>
                                <th className="w-1/4 border border-blue-800">
                                  Knock server port
                            </th>
                                <th className="w-1/4 border border-blue-800">
                                  Manage
                            </th>
                                <th className="w-1/4 border border-blue-800">
                                  Delete
                            </th>
                              </tr>
                            </thead>
                            {ipList.map((item, index) => (
                              <tbody key={index}>
                                <tr>
                                  <td>{item.IPAddress}</td>
                                  <td>{item.port}</td>
                                  <td>
                                    <button
                                      className="bg-blue-300 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:m-1 mb-1"
                                      onClick={() => managePorts(item)}
                                    >
                                      Manage
                                    </button>
                                  </td>
                                  <td>
                                    <button
                                      className="bg-red-400 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:m-1 mb-1"
                                      onClick={() => DeleteServer(item.id)}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            ))}
                          </table>
                        </>
                        : ""}
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
