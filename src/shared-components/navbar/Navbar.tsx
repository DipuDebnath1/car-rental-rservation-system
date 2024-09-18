import { navigationMenuItems } from "@/utilities/menuBar";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-2">
            <Link to={'/'}>
            <h1 className="text-2xl font-bold text-gray-800 " style={{fontFamily:"cursive"}}>FlexiCar</h1></Link>
          </div>
  
          {/* Navigation Menu */}
          <nav className="hidden md:flex space-x-6">
            {
                navigationMenuItems.map((navigationItem,i)=><NavLink key={i} className="text-gray-600 hover:text-blue-500 h-full" to={navigationItem.path}>{navigationItem.title}</NavLink>)
            }
          </nav>

          {/* small device view */}
         { showMenu && <nav className="absolute md:hidden flex top-[4rem] flex-col shadow-xl border items-center justify-start w-[10rem] right-[1rem] rounded transition bg-gray-50">
            {
                navigationMenuItems.map((navigationItem, i)=><NavLink key={i} onClick={()=>setShowMenu(!showMenu)}  className="text-gray-600 hover:text-blue-500 h-full text-sm font-semibold shadow w-full py-2 px-3" to={navigationItem.path}>{navigationItem.title}</NavLink>)
            }
          </nav>}
  
          {/* Login */}
          <div className="flex items-center gap-5">
            <Link to="/sign-in" className="text-gray-600 hover:text-blue-500"> SignIn </Link>
            <button onClick={()=>setShowMenu(!showMenu)} className="text-gray-600 hover:text-blue-500 md:hidden">  
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            </button>
          </div>
        </div>
      </header>
    );
};

export default Navbar;