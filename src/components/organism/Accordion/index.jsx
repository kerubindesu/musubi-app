import React, { useState } from 'react';

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const renderedItems = items.map((item, index) => {
    const active = index === activeIndex ? 'block' : 'hidden';
    return (
      <div key={index} className="accordion-item">
        <div
          className="accordion-header bg-gray-200 cursor-pointer py-2 px-4"
          onClick={() => onTitleClick(index)}
        >
          {item.title}
        </div>
        <div className={`accordion-content ${active} bg-gray-100 py-2 px-4`}>
          {item.content}
        </div>
      </div>
    );
  });

  return <div className="accordion">{renderedItems}</div>;
};

export default Accordion;
