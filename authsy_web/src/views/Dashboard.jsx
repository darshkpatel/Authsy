import React, { useEffect, useState } from "react";
import { getUser, generateKey } from "../utils/auth";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.js";
import FooterSmall from "../components/FooterSmall.js";

export default function Login() {
  const [user, setUser] = useState();
  const [key, setKey] = useState();
  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line no-use-before-define
      const _user = await getUser();
      console.log(_user);
      setUser(_user);
    };
    fetchData();
  }, []);

  async function setup2FA() {
    const _user = await generateKey();
    console.log(_user);
    setKey(_user.key);
  }

  // ToDo: Add Loader while fetching user
  return (
    <>
      <Navbar transparent />
      {user && (
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
            <div className="container mx-auto px-4 h-full">
              <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                    {`Hey! ${user.name}`}
                  </div>
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <h1>Dashboard</h1>
                      <div>
                        {`Access Token: ${localStorage.getItem(
                          "access_token"
                        )}`}
                        <br />
                        {`Refresh Token: ${localStorage.getItem(
                          "refresh_token"
                        )}`}
                      </div>
                      <button
                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => {
                          setup2FA();
                        }}
                      >
                        Setup 2FA
                      </button>
                      <Link to="/receive">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                        >
                          Next
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FooterSmall absolute />
          </section>
        </main>
      )}
    </>
  );
}
