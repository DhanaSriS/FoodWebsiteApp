import React from 'react'

const About = () => {
  return (
    <div className="flex flex-wrap">
    <div className="w-full sm:w-8/12 mb-10">
      <div className="container mx-auto h-full sm:p-10">
        <nav className="flex px-4 justify-between items-center">
          <div className="text-4xl font-bold">
            About Us<span className="text-green-700">.</span>
          </div>
          <div>
            <img src="https://image.flaticon.com/icons/svg/497/497348.svg" alt="" className="w-8"/>
          </div>
        </nav>
        <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
          <div className="w-full">
            <h1 className="text-4xl lg:text-6xl font-bold"><span className="text-green-700"></span>“We deliver the goodness!”</h1>
            <div className="w-20 h-2 bg-green-700 my-4"></div>
            <p className="text-xl mb-10">We're not just a food delivery service; we're your culinary companions. Our journey began with a passion for flavors, convenience, and community. Here's what sets us apart</p>
            <ul className="list-disc list-inside text-gray-600 max-w-2xl mx-auto mt-4">
          <li>
            <span className="font-semibold">Fresh Ingredients:</span> We source the finest ingredients to ensure every meal is a delightful experience.
          </li>
          <li>
            <span className="font-semibold">Local Love:</span> Supporting local restaurants and chefs is at the heart of what we do.
          </li>
          <li>
            <span className="font-semibold">Fast & Reliable:</span> Craving strikes? We've got you covered with lightning-fast deliveries.
          </li>
        </ul>
          </div>
        </header>
      </div>
    </div>
    <img src="./images/about.jpeg" alt="About" className="w-full h-48 object-cover sm:h-screen sm:w-4/12"/>
  </div>
  )
}

export default About