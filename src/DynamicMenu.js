import React, { useEffect, useState, useCallback } from 'react';
import './DynamicMenu.css';
import searchIcon from './asset/search.png';
import downArrow from './asset/Vector.png';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [links, setLinks] = useState([
    { text: 'EXPLORE' },
    { text: 'ELECTRONICS' },
    { text: 'BRANDS' },
    { text: 'SALE' },
    { text: 'CONNECT' },
    { text: 'SHOP' },
  ]);
  const [moreLinks, setMoreLinks] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const updateRightmostPosition = useCallback(() => {
    const breakpoint = 768;

    if (window.innerWidth < breakpoint && links.length > 2) {
      const numItemsToMove = links.length - 2;
      const movedItems = links.splice(-numItemsToMove, numItemsToMove);
      setMoreLinks(movedItems);
    } else if (window.innerWidth >= breakpoint && moreLinks.length > 0) {
      const movedItems = moreLinks.splice(0, moreLinks.length);
      setLinks((prevLinks) => [...prevLinks, ...movedItems]);
    }
  }, [links, moreLinks]);

  useEffect(() => {
    window.addEventListener('resize', updateRightmostPosition);
    updateRightmostPosition();

    return () => {
      window.removeEventListener('resize', updateRightmostPosition);
    };
  }, [updateRightmostPosition]);

  return (
    <div className="navbar">
      <div className="logo">
        {/* <img src={shopifyLogo} alt="Shopify Logo" /> */}
        <div className="logo-text">Shopify</div>
      </div>
      <div className="links">
        {links.map((link, index) => (
          <a key={index} className="item" href={link.href}>
            {link.text}
          </a>
        ))}
      </div>
      {moreLinks.length > 0 && (
        <div className="more-button" onClick={toggleDropdown}>
          MORE <img src={downArrow} alt="Arrow" />
          <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
            {moreLinks.map((link, index) => (
              <a key={index} href={link.href}>
                {link.text}
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="search">
        <img src={searchIcon} alt="search icon" />
        <div className="search-text">Search Products</div>
      </div>
    </div>
  );
};

export default Navbar;
