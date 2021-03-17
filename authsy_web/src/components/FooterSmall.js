import React from "react";

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "fixed w-full bottom-0 bg-gray-900 z-11"
            : "relative") + " pb-6 z-20"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-gray-700" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-white font-semibold py-1">
                Copyright © {new Date().getFullYear()}{" "}
                  Authsy Team
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
