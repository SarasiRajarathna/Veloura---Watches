import React from 'react'

export default function header() {
  return (
    <header>
        <Link to="/" className="lg:w-[200px] h-full  absolute  lg:left-10 flex justify-center items-center">
                <img src="/logo.png" alt="Logo" className=" h-[60px] mr-2"/>
        </Link>
        <div className="h-full hidden lg:flex justify-center items-center gap-10">
            <Link to="/" className="text-amber-400 text-md font-semibold">Home</Link>
            <Link to="/products" className="text-amber-400 text-md font-semibold">About Us</Link>
            <Link to="/contact-us" className="text-amber-400 text-md font-semibold">Contact Us</Link>
        </div>
        <div>
            <Link to="/register" className="text-amber-400 text-md font-semibold hidden  lg:block">
				Login
			</Link>
            <Link to="/register" className="text-amber-400 text-md font-semibold hidden  lg:block">
			    Register
			</Link>
        </div>
    </header>
  )
}
