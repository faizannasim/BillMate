import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";



function NavBar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
   
  return (
    <>
      <header className="bg-black font-sans  h-full">
        <div className="max-w-5xl bg-black border-dashed border-b border-zinc-600 h-17 flex mx-auto items-center justify-between px-9">
          <div className="flex items-center space-x-4">
            <div className="relative ml-2">
              <div
                className="h-screen border-l border-dashed border-zinc-600 absolute top-0 right-11"
                style={{ marginLeft: "138px", height: "2255px" }}
              ></div>
            </div>
            <div className="flex items-center justify-center w-10 border-dashed gap-2 text-white">
              <span className="text-white font-stretch-extra-expanded text-lg">
                BILLMATE
              </span>
            </div>
          </div>

          <div>
            <div className="relative ml-2">
              <div
                className="border-l border-dashed border-zinc-600 absolute top-0"
                style={{ marginLeft: "150px", height: "2275px" }}
              ></div>
            </div>

            <div className="flex items-center gap-2.5 text-lg font-medium pl-2 pr-1 py-1 bg-zinc-900 hover:bg-zinc-700 cursor-pointer border border-zinc-800 rounded-full hover:border-zinc-700 transition-colors">
              <a
                href="#"
                className="text-zinc-200 font-stretch-extra-expanded cursor-pointer"
                onClick={handleLoginClick}
              >
                Login
              </a>
              <div className="bg-zinc-700 rounded-full text-zinc-300 text-sm flex items-center justify-center font-bold px-2 py-0.5 font-stretch-extra-expanded">
                <a href="/helo">
                  <FaUser className="h-5 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

    
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-15 flex items-center justify-center z-50">
          <div className="bg-zinc-900 relative w-80 rounded-lg p-6">
            <button
              className="absolute top-2 right-2 text-zinc-400 hover:text-white"
              onClick={handleCloseModal}
            >
              X
            </button>
            <h2 className="text-white text-xl  items-center justify-between flex font-bold mb-4">Sign In</h2>
            <div className="flex justify-center">
              <GoogleLogin
              onSuccess={(credentialResponse)=>{
                console.log(credentialResponse)
                console.log(jwtDecode(credentialResponse.credential));
                  handleCloseModal();
                  navigate("/invoice")
              }} 
              onError={() => console.log("Login Failed")}
              
              >
               
              </GoogleLogin>

            </div>
            
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
