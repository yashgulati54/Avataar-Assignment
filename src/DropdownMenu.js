// src/DropdownMenu.js
import React from 'react';

const DropdownMenu = ({ items, onItemClick }) => {
  return (
    <div className="dropdown-menu">
      {items.map((item, index) => (
        <div key={index} className="menu-item" onClick={() => onItemClick(item)}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
