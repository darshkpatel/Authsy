import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-gray-900 pt-5 pb-8">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{ height: "80px", transform: "translateZ(0)" }}
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
              className="text-gray-900 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full text-gray-400 text-center px-4" style={{fontSize: 20}}>
              Copyright © 2021 Authsy Team
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
