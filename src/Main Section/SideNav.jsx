import React from 'react';
import { Layers2, CirclePlus } from 'lucide-react';

function SideNav() {
  return (
    <aside className="h-screen w-64 bg-[#1E1E1E] flex flex-col p-4 shadow-lg">
      
      <h2
        className="text-white text-base font-bold mb-6 tracking-wide ml-2"
        style={{ fontFamily: 'Montserrat' }}
      >
        Invoice
      </h2>

      <nav className="flex flex-col gap-3 flex-1">
        
        <div>
          <h1
            className="flex items-center p-1 text-[10px] uppercase text-gray-400 tracking-wider mb-2"
            style={{ fontFamily: 'Montserrat' }}
          >
            Navigation
          </h1>

         
          <a
            href="#"
            className="flex items-center p-2 text-[12px] rounded gap-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            style={{ fontFamily: 'Poppins' }}
          >
            <Layers2 size={18} /> Invoices
          </a>

        
          <a
            href="#"
            className="flex items-center p-2 text-[12px] rounded gap-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            style={{ fontFamily: 'Poppins' }}
          >
            <CirclePlus size={18} /> Create Invoice
          </a>
        </div>


        <div className="flex flex-col gap-1 p-3 bg-gray-600 mt-auto rounded-lg">
          <h1
            className="flex items-center gap-1 uppercase tracking-wider text-white text-sm"
            style={{ fontFamily: 'Montserrat' }}
          >
            Login
          </h1>
          <p className="text-[11px] text-gray-300" style={{ fontFamily: 'Poppins' }}>
            Login to your account to save your data and access it anywhere
          </p>
          <a
            href="#"
            className="flex items-center w-20 rounded-full justify-center p-1 gap-1 text-[12px] text-white bg-blue-600 hover:bg-blue-500 transition-colors mt-1"
            style={{ fontFamily: 'Poppins' }}
          >
            Sign In
          </a>
        </div>
      </nav>
    </aside>
  );
}

export default SideNav;
