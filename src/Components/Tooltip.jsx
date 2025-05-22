import { useState } from "react";
const Tooltip = ({ children, content }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <div 
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute z-10 w-64 p-2 mt-1 text-sm text-white bg-amber-800 rounded-lg shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
};
export default Tooltip;