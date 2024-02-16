import React from 'react';
import { RiArrowDropRightFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="h-8 lg:h-16 text-sm flex justify-start items-center" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.url ? (
              <Link to={item.url} className="text-slate-500 hover:text-slate-700">
                {item.text}
              </Link>
            ) : (
              <span className="text-slate-500">{item.text}</span>
            )}
            {index < items.length - 1 && (
              <RiArrowDropRightFill className="text-slate-500 text-2xl" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
