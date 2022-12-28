import React from "react";

const Button = ({ children, className }) => {
  return (
    <button
      type="submit"
      className={`${className} bg-[#00df9a] text-slate-900 px-6 py-1 rounded-md`}
    >
      {children}
    </button>
  );
};

export default Button;
