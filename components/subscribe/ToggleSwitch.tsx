import React, { useState } from "react";

const ToggleSwitch: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="inline-flex items-center cursor-pointer mb-5">
      <span className="mr-3 text-base font-medium text-gray-900 dark:text-gray-300">
        Enterprise Leads
      </span>

      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        className="sr-only peer"
      />

      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-none peer-focus:ring-none  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-black "></div>

      <span className="ms-3 text-base font-medium text-gray-900 dark:text-gray-300">
        Subscribers
      </span>
      
    </label>
  );
};

export default ToggleSwitch;
