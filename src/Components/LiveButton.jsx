import React from "react";

function LiveButton() {
  return (
    <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600 shadow-md text-white font-bold text-sm">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
      </span>
      <span>LIVE</span>
    </div>
  );
}

export default LiveButton;
