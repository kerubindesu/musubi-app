import React, { useState, useEffect, useRef } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Dropdown = ({ children, options, dropdownIcon, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="w-full flex justify-center items-center text-base font-medium text-gray-700 bg-transparent rounded-lg focus:outline-none"
        onClick={toggleDropdown}
      >
        {children || ""}
        {dropdownIcon && <RiArrowDropDownLine />}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option, index) => (
              <Link
                key={index}
                to={option.link}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {option.label}
              </Link>
            ))}
          </div>
          {onLogout && (
            <div className="block px-4 py-2 mb-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={onLogout}>Logout</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;