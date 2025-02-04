import React from "react";

const AuthBackgroundSection = ({ bgImage, title, description }) => {
  return (
    <div className="relative col-span-6">
      <img
        src={bgImage}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-20"></div> {/* Dark overlay */}
      <div className="absolute w-full h-full flex justify-center items-end">
        <div className="text-white p-12 space-y-5">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthBackgroundSection;
