import React from "react";

const AuthBackgroundSection = ({ bgImage, title, description }) => {
  return (
    <div className="relative col-span-full row-span-3 lg:col-span-6 lg:row-span-full">
      <img
        src={bgImage}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-20"></div> {/* Dark overlay */}
      <div className="absolute w-full h-full flex justify-center items-center md:items-end ">
        <div className="text-white p-6 md:p-12 space-y-3 sm:space-y-5">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{title}</h1>
          <p className="lg:text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthBackgroundSection;
