import React, { useState } from "react";
import { FaAlignRight, FaRegMoon, FaSun } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [theme, setTheme] = useState(false);
  return (
    <header className=" dark:bg-gray-800 bg-gray-400">
      <div className="container mx-auto flex justify-between items-center h-12 px-4">
        <div>
          <NavLink to="/" className="">
            <h2 className="text-2xl font-bold dark:text-[#00df9a]">
              Daily Task
            </h2>
          </NavLink>
        </div>
        <div className="">
          <ul className="md:flex hidden">
            <li>
              <NavLink to="/" className="pl-4">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-task" className="pl-4">
                Add Task
              </NavLink>
            </li>
            <li>
              <NavLink to="my-task" className="pl-4">
                My task
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="pl-4">
                Login
              </NavLink>
            </li>
            <li onClick={() => setTheme(!theme)}>
              <button className="pl-4">
                {theme ? <FaRegMoon /> : <FaSun />}
              </button>
            </li>
          </ul>
        </div>
        {nav ? (
          <>
            <button
              className="flex text-3xl justify-end md:hidden"
              onClick={() => setNav(!nav)}
            >
              X
            </button>
          </>
        ) : (
          <>
            <button
              className="flex text-2xl justify-end md:hidden"
              onClick={() => setNav(!nav)}
            >
              <FaAlignRight />
            </button>
          </>
        )}
      </div>
      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r bg-gray-400 ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <ul className="pt-24  text-gray-100 uppercase">
          <li className="p-2">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/add-task">Add Task</NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/my-task">My task</NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/login">Login</NavLink>
          </li>
          <li onClick={() => setTheme(!theme)}>
            <button className="pl-4">
              {theme ? <FaRegMoon /> : <FaSun />}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
