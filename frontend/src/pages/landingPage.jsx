import React from 'react'

export default function landingPage() {
  return (
    <div>
        <div className="w-full h-full relative">
          <video autoPlay loop muted className="w-full h-full object-cover">
            <source src="/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute top-0 left-0 w-full h-full  bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Welcome to Veloura Store!</h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-8">Your one-stop shop for all your computer needs.</p>
            <a href="/products" className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark transition duration-300">Shop Now</a>
          </div>
        </div>

        <div className="flex justify-center">
            <h1 className="text-4xl ">About Us</h1>

        </div>

        <div>
            <h1>Contact Us</h1>
        </div>
    </div>
  )
}
