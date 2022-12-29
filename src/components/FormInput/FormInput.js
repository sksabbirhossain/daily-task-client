import React from "react";

const FormInput = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor="">{label}</label>
      <input
        {...rest}
        className="border rounded-md px-2 py-1 mt-2  dark:border-gray-700 dark:bg-gray-500 dark:text-gray-100"
      />
    </div>
  );
};

export default FormInput;
