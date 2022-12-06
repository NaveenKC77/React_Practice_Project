import React from "react";
import logo from "./images/logo.svg";
import { FaBars } from "react-icons/fa";
import sublinks from "./data.js";
import { useGlobalContext } from "./context";
const Navbar = () => {
  const {
    openSidebar,
    isSidebarOpen,
    isSubmenuOpen,
    openSubmenu,
    closeSubmenu,
  } = useGlobalContext();

  const handleSubmenu = (e) => {
    if (!e.target.classList.contains("link-btn")) {
      closeSubmenu();
    }
  };

  const displaySubmenu = (e) => {
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;
    const page = e.target.textContent;
    openSubmenu(page, { center, bottom });
  };
  return (
    <nav className="nav" onMouseOver={handleSubmenu}>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} alt="logo" className="nav-logo" />
          <button className="btn toggle-btn" onClick={openSidebar}>
            <FaBars></FaBars>
          </button>
        </div>
        <ul className="nav-links">
          {sublinks.map((sublink, index) => {
            return (
              <li id={index}>
                <button className="link-btn" onMouseOver={displaySubmenu}>
                  {sublink.page}
                </button>
              </li>
            );
          })}
        </ul>
        <button className=" btn signin-btn">Sign-in</button>
      </div>
    </nav>
  );
};

export default Navbar;
