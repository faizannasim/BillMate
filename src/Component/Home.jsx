import React from "react";
import png from "/nice.png";
import svg from "/hub.png";
import git from "/lab.png";
import bg from "/bg.webp";
import img from "/for.png"
import { motion } from "framer-motion";



function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <img src={bg} className="object-contain h-full w-full absolute inset-0  " />

      <div className="flex flex-col items-center justify-center min-h-screen  mx-auto  text-center ">
        <motion.h1  initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }} className="text-3xl md:text-5xl font-light text-gray-600 font-stretch-extra-expanded" style={{fontFamily:"Montserrat"}}>
          Turn{" "}
          <span className="text-white   font-stretch-extra-expanded font-light">
            Invoices
          </span>{" "}
          Into Something
        </motion.h1>
        <motion.span className="text-xl md:text-3xl mt-2.5   text-gray-600  ffont-stretch-extra-expanded font-light "  initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}>
          Clients Actually Want to{" "}
          <span className="text-white font-stretch-extra-expanded font-light">
            Open
          </span>
        </motion.span>

        < motion.div className="flex flex-col md:flex-row gap-4 mt-8"  initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}>
          <a
            href="#"
           
            className="flex items-center gap-2 font-medium rounded-full  relative z-10 bg-zinc-900 hover:bg-zinc-700 font-stretch-extra-expanded transition-colors text-lg px-4 py-2" 
          >

            Get Started
            <img src={png} className="h-5" />
         </a>

          <a
            href="#"
            className="flex items-center gap-2 font-medium rounded-full font-stretch-extra-expanded relative z-10 bg-zinc-900 hover:bg-zinc-700 transition-colors text-lg px-4 py-2"
          >
            Open Repo
            <div
              className="flex items-center justify-center px-2 py-1 rounded-full"
              style={{ backgroundColor: "#2100c4" }}
            >
              <img src={svg} className="h-5 rounded-full" />
            </div>
          </a>
          </motion.div>
      </div>
       
      < motion.div className="w-full    max-w-5xl mx-auto border-y border-dashed border-zinc-600 grid grid-cols-1 md:grid-cols-3  gap-6 px-6 py-10"  initial={{ opacity: 0, x: -50 }} 
  whileInView={{ opacity: 1, x: 0 }} 
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}>
        <div className="border-r-8 border-dashed border-zinc-600 pr-4 font-stretch-extra-expanded font-mono">
          <h1 className="text-2xl text-white">Beautiful</h1>
          <p className="text-sm">Professionally designed</p>
          <p className="text-sm">and visually appealing</p>
          <p className="text-sm">invoices can increase the chances</p>
          <p className="text-sm">of clients paying promptly.</p>
        </div>
        <div className="border-r-8 border-dashed border-zinc-600 pr-4 font-stretch-extra-expanded font-mono">
          <h1 className="text-2xl text-white">Free & Unlimited</h1>
          <p className="text-sm">Professionally designed</p>
          <p className="text-sm">and visually appealing</p>
          <p className="text-sm">invoices can increase the chances</p>
          <p className="text-sm">of clients paying promptly.</p>
        </div>
        <div className=" pr-4 font-stretch-extra-expanded font-mono">
          <h1 className="text-2xl text-white">Safe & Open Source</h1>
          <p className="text-sm">Professionally designed</p>
          <p className="text-sm">and visually appealing</p>
          <p className="text-sm">invoices can increase the chances</p>
          <p className="text-sm">of clients paying promptly.</p>
        </div>
       </motion.div>

      <div className="bg-black mt-10 px-6 ">
        <div className="flex justify-center ">
          <a
            href="#"
            className="flex items-center justify-center font-bold rounded-full   border bg-zinc-900 border-dashed hover:border-zinc-700 transition-colors text-lg font-stretch-extra-expanded px-9 py-2"
          >
            Our Sponsor
          </a>
        </div>

        <div className="w-full max-w-5xl  mx-auto mt-10 border-y border-dashed border-zinc-600 flex flex-col md:flex-row items-center gap-6 py-6">
          
          <motion.img     whileHover={{ scale: 1.1 }}
  transition={{ type: "spring", stiffness: 200 }}  src={git} className="h-30  ml-3 w-40 object-contain" />
          <div className="absolute mb-26 ml-52" >

          <h2 className="text-lg  text-white flex items-center gap-2 font-stretch-extra-expanded font-mono ">
            GitLab
           <span className="bg-zinc-700 text-[10px] px-2 py-0.5 rounded-md font-stretch-extra-expanded font-mono text-muted-foreground bg-muted/30 "> 
              Open Source Platform
            </span>
          </h2>
          </div>

          <p className=" text-white font-stretch-extra-expanded font-mono text-sm   ml-3 border-l-8   border-dashed border-zinc-600 ">
            GitLab is a popular open-source platform for code hosting and
            collaboration, offering developers powerful tools for version
            control, CI/CD, and team productivity.
          </p>
        </div>
        <div className="w-full max-w-5xl mx-auto mt-10 border-y border-dashed border-zinc-600 flex flex-col md:flex-row items-center gap-6 py-6">
             <div className="absolute mb-26 ml-52" >

          <h2 className="text-lg  text-white flex items-center gap-2 font-stretch-extra-expanded font-mono ">
            SourceForge
            <span className="bg-zinc-700 text-[10px] px-2 py-0.5 rounded-md font-stretch-extra-expanded font-mono text-muted-foreground bg-muted/30 "> 
                   Open Source Directory
            </span>
          </h2>
          </div>
          <p className=" text-white font-mono text-sm   ml-3 border-r-8  border-dashed border-zinc-600">
            SourceForge is one of the oldest and most trusted open-source
            platforms, bringing together millions of developers and users to
            explore, share, and improve software
          </p>
          <img src={img} className="h-30  ml-3 w-40 object-contain" />
          <div className="border-r   border-dashed border-zinc-600"></div>
        </div>
         <div className="w-full max-w-5xl  mx-auto mt-10 border-y border-dashed border-zinc-600 flex flex-col md:flex-row items-center gap-6 py-6">
          
  <div className="w-90 h-40  rounded border-dashed border-zinc-600 ml-4 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#1a1a1a_2px,#1a1a1a_4px)] flex items-center justify-center">
  <span className="font-mono font-stretch-extra-expanded">Your Image Here</span>
  </div>

          <div className="absolute mb-26 ml-78" >

          <h2 className="text-lg  text-white flex items-center gap-2 font-stretch-extra-expanded font-mono ">
            Your Company Here
           <span className="bg-zinc-700 text-[10px] px-2 py-0.5 rounded-md font-stretch-extra-expanded font-mono text-muted-foreground bg-muted/30 "> 
              Sponser
            </span>
          </h2>
          </div>

         <div className="ml-3">
  <p className="text-white font-stretch-extra-expanded font-mono text-sm border-l-8 border-dashed border-zinc-600">
    Free forever. Powered by community and sponsors. If you’d like to support BillMate with your service, let’s talk.
  </p>

  <span className="block mt-3">
    <a href="mailto:faizannasim59@gmail.com" className="bg-zinc-700 px-2 py-0.5 rounded-md font-stretch-extra-expanded  text-muted-foreground font-mono">
     Contact
    </a>
  </span>
</div>

         


        </div>
         <div className="w-full max-w-5xl  mx-auto mt-10 border-y border-dashed border-zinc-600  flex-col md:flex-row items-center gap-6 py-6 flex justify-center item-center ">
          
         
           <div className="flex flex-col items-center">

          <motion.p className="text-white text-8xl md:text-9xl  font-stretch-extra-expanded   border-zinc-600 px-8 py-4 rounded-lg bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 mask-radial-from-neutral-900 "   initial={{ opacity: 0, scale: 0.5 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1, ease: "easeOut" }}
  viewport={{ once: true }}>
            BILLMATE
          </motion.p>
          <br/>
          <span className="  font-light text-4xl inline-block  tracking-wide  text-white font-stretch-extra-expanded text-lg mask-radial-from-neutral-900"> Invoices Reimagined</span>
          </div>
        </div>
        
      </div>
      </div>
      
 
  );
}

export default Home;
