import React from 'react';
import { Layers2, CirclePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

function SideNav() {
  return (
    <aside className="h-screen w-64 bg-black flex flex-col  p-4 shadow-lg">
      
     
      <nav className="flex flex-col gap-3 flex-1">
        
        <div>
         
         
          <a
            href="#"
            className="flex items-center p-2 text-[18px] rounded gap-2 text-gray-300 hover:bg-[#a3a4a32c] hover:text-white transition-colors font-stretch-ultra-condensed "
          
          >
            <Layers2 size={18} /> Invoices
          </a>

        
          <Link
            to="/invoice"
            className="flex items-center p-2 text-[18px] rounded gap-2 text-gray-300 hover:bg-[#a3a4a32c] hover:text-white transition-colors font-stretch-ultra-condensed"
            
          >
            <CirclePlus size={18} /> Create Invoice
          </Link>
        </div>


        
      </nav>
    </aside>
  );
}

export default SideNav;
