import React from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="h-16 text-sm flex justify-start items-center overflow-x-auto no-scrollbar " aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        {items.map((item, index) => (
          <li key={index + 1} className="flex items-center truncate">
            {item.url ? (
              <Link to={item.url} className="text-slate-500 hover:text-slate-700">
                {item.text}
              </Link>
            ) : (
              <span className="text-slate-500">{item.text}</span>
            )}
            {index < items.length - 1 && (
              <RiArrowDropRightLine className="text-slate-500 text-2xl" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
