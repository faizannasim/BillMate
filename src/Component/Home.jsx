import React from "react";

import png from "/nice.png";
import svg from "/hub.png";
import git from "/lab.png";

import img from "/for.png"
import bt from "/black.jpeg"
import car from "/car.jpeg"
import gir from "/gir.jpeg"


import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  return (
  
    <div className="bg-black text-white overflow-x-hidden">
      <div className="relative flex flex-col items-center justify-center min-h-screen mx-auto text-center px-4 sm:px-6">
        
        <motion.img
          src={gir}
          alt="Background"
          className="absolute top-16 left-1/2 transform -translate-x-1/2 w-72 h-72 md:w-96 md:h-96 object-cover z-0 opacity-40 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          drag
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-light text-white font-stretch-extra-expanded"
            style={{
              backgroundImage: `url(${car})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Turn{" "}
            <span className="text-white font-stretch-extra-expanded font-light">
              Invoices
            </span>{" "}
            Into Something
          </motion.h1>
          
          {/* RESPONSIVE CHANGE: Corrected a typo in the class name. */}
          <motion.span
            className="text-xl md:text-3xl mt-2.5 text-gray-600 font-stretch-extra-expanded font-light "
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
            style={{
              backgroundImage: `url(${car})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Clients Actually Want to{" "}
            <span
              className="text-white font-stretch-extra-expanded font-light"
              style={{
                backgroundImage: `url(${car})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Open
            </span>
          </motion.span>
        </div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
        >
          <Link
            to="/invoice"
            className="flex items-center justify-center gap-2 font-medium rounded-full relative z-10 bg-zinc-900 hover:bg-zinc-700 font-stretch-extra-expanded transition-colors text-lg px-4 py-2"
          >
            Get Started
            <img src={png} className="h-5" alt="Get Started" />
          </Link>

          <a
            href="https://github.com/faizannasim/BillMate.git"
            className="flex items-center justify-center gap-2 font-medium rounded-full font-stretch-extra-expanded relative z-10 bg-zinc-900 hover:bg-zinc-700 transition-colors text-lg px-4 py-2"
          >
            Open Repo
            <div
              className="flex items-center justify-center rounded-full"
            >
              <img src={svg} className="h-8 w-8 rounded-full" alt="Repo"/>
            </div>
          </a>
        </motion.div>
      </div>

      
      <motion.div
        className="w-full max-w-5xl mx-auto border-y border-dashed border-zinc-600 grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-x-6 px-6 py-10"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        
        <div className="md:border-r-8 border-dashed border-zinc-600 md:pr-4 font-stretch-extra-expanded font-mono text-center md:text-left">
          <h1 className="text-2xl text-white">Beautiful</h1>
          <p className="text-sm">Professionally designed</p>
          <p className="text-sm">and visually appealing</p>
          <p className="text-sm">invoices can increase the chances</p>
          <p className="text-sm">of clients paying promptly.</p>
        </div>
        <div className="md:border-r-8 border-dashed border-zinc-600 md:pr-4 font-stretch-extra-expanded font-mono text-center md:text-left">
          <h1 className="text-2xl text-white">Free & Unlimited</h1>
          <p className="text-sm">Professionally designed</p>
          <p className="text-sm">and visually appealing</p>
          <p className="text-sm">invoices can increase the chances</p>
          <p className="text-sm">of clients paying promptly.</p>
        </div>
        <div className="font-stretch-extra-expanded font-mono text-center md:text-left">
          <h1 className="text-2xl text-white">Safe & Open Source</h1>
          <p className="text-sm">Professionally designed</p>
          <p className="text-sm">and visually appealing</p>
          <p className="text-sm">invoices can increase the chances</p>
          <p className="text-sm">of clients paying promptly.</p>
        </div>
      </motion.div>

      <div className="bg-black mt-10 px-4 sm:px-6">
        <div className="flex justify-center ">
          <a
            href="#"
            className="flex items-center justify-center font-bold rounded-full border bg-zinc-900 border-dashed hover:border-zinc-700 transition-colors text-lg font-stretch-extra-expanded px-9 py-2"
          >
            Our Sponsor
          </a>
        </div>

       
        <div className="w-full max-w-5xl mx-auto mt-10 border-y border-dashed border-zinc-600 flex flex-col md:flex-row items-center gap-6 md:gap-8 py-6">
            <motion.img whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }} src={git} className="h-24 w-40 object-contain flex-shrink-0" alt="GitLab"/>
            <div className="w-full md:border-l-8 border-dashed border-zinc-600 md:pl-8 text-center md:text-left">
                <h2 className="text-lg text-white flex flex-wrap items-center justify-center md:justify-start gap-2 font-stretch-extra-expanded font-mono ">
                    GitLab
                    <span className="bg-zinc-700 text-[10px] px-2 py-0.5 rounded-md font-stretch-extra-expanded font-mono text-muted-foreground bg-muted/30 ">
                        Open Source Platform
                    </span>
                </h2>
                <p className="mt-2 text-white font-stretch-extra-expanded font-mono text-sm">
                    GitLab is a popular open-source platform for code hosting and
                    collaboration, offering developers powerful tools for version
                    control, CI/CD, and team productivity.
                </p>
            </div>
        </div>


        <div className="w-full max-w-5xl mx-auto mt-10 border-y border-dashed border-zinc-600 flex flex-col md:flex-row items-center gap-6 md:gap-8 py-6">
            <div className="w-full md:border-r-8 border-dashed border-zinc-600 md:pr-8 text-center md:text-left order-2 md:order-1">
                <h2 className="text-lg text-white flex flex-wrap items-center justify-center md:justify-start gap-2 font-stretch-extra-expanded font-mono ">
                    SourceForge
                    <span className="bg-zinc-700 text-[10px] px-2 py-0.5 rounded-md font-stretch-extra-expanded font-mono text-muted-foreground bg-muted/30 ">
                        Open Source Directory
                    </span>
                </h2>
                <p className="mt-2 text-white font-mono text-sm">
                    SourceForge is one of the oldest and most trusted open-source
                    platforms, bringing together millions of developers and users to
                    explore, share, and improve software.
                </p>
            </div>
            <img src={img} className="h-24 w-40 object-contain flex-shrink-0 order-1 md:order-2" alt="SourceForge"/>
        </div>


        <div className="w-full max-w-5xl mx-auto mt-10 border-y border-dashed border-zinc-600 flex flex-col md:flex-row items-center gap-6 md:gap-8 py-6">
            <div className="w-full md:w-64 h-40 rounded border-dashed border-zinc-600 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#1a1a1a_2px,#1a1a1a_4px)] flex items-center justify-center flex-shrink-0">
                <span className="font-mono font-stretch-extra-expanded text-center px-2">Your Image Here</span>
            </div>
            <div className="w-full md:border-l-8 border-dashed border-zinc-600 md:pl-8 text-center md:text-left">
                <h2 className="text-lg text-white flex flex-wrap items-center justify-center md:justify-start gap-2 font-stretch-extra-expanded font-mono ">
                    Your Company Here
                    <span className="bg-zinc-700 text-[10px] px-2 py-0.5 rounded-md font-stretch-extra-expanded font-mono text-muted-foreground bg-muted/30 ">
                        Sponsor
                    </span>
                </h2>
                <div className="mt-2">
                    <p className="text-white font-stretch-extra-expanded font-mono text-sm">
                        Free forever. Powered by community and sponsors. If you’d like to support BillMate with your service, let’s talk.
                    </p>
                    <span className="block mt-3">
                        <a href="mailto:faizannasim59@gmail.com" className="inline-block bg-zinc-700 px-2 py-0.5 rounded-md font-stretch-extra-expanded text-muted-foreground font-mono hover:bg-zinc-600 transition-colors">
                            Contact
                        </a>
                    </span>
                </div>
            </div>
        </div>


        <div className="w-full max-w-5xl mx-auto mt-10 border-y border-dashed border-zinc-600 flex flex-col items-center justify-center gap-6 py-10 mb-10">
          <div className="flex flex-col items-center">
      
            <motion.p
              className="text-6xl sm:text-8xl md:text-9xl font-stretch-extra-expanded break-words"

              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              drag
              dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{
                fontFamily:"initial",
                backgroundImage: `url(${car})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              BILLMATE
            </motion.p>

            <br />
            <span className="font-light inline-block bg-black tracking-wide text-white font-stretch-extra-expanded text-lg text-center">
              Invoices Reimagined
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

