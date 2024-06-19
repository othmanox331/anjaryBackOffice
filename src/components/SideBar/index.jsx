import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaBoxes } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import "./index.css";
import { useNavigate } from "react-router-dom";

const links = [
  { tab: "Home", action: "/", icon: "Home" },
  { tab: "Orders", action: "Orders", icon: "Orders" },
  { tab: "Products", action: "Products", icon: "Products" },
  { tab: "Categories", action: "Categories", icon: "Categories" },
];
const index = () => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [isSideBareActive, setIsSideBareActive] = useState(false);

  const PrintActions = () => {
    let LinkData = links.map((link, key) => (
      <li key={key}>
        <a onClick={() => navigate(link.action)}>
          <span>{getActionIcon(link.icon)}</span>
          <p>{link.tab}</p>
        </a>
      </li>
    ));
    return LinkData;
  };

  const getActionIcon = (iconName) => {
    let iconSize = width <= 799 ? 14 : 28;
    switch (iconName) {
      case "Home":
        return <AiFillHome size={iconSize} />;
        break;
      case "Orders":
        return <RiMoneyDollarCircleFill size={iconSize} />;
        break;
      case "Products":
        return <FaBoxes size={iconSize} />;
        break;
      case "Categories":
        return <BiSolidCategory size={iconSize} />;
        break;
    }
  };

  const showSideBar = () => {
    setIsSideBareActive(!isSideBareActive);
  };

  return (
    <nav className={isSideBareActive ? "SideBar active" : "SideBar"}>
      <div className="SideBare_Trigger" onClick={() => showSideBar()}>
        <IoIosArrowBack />
      </div>
      <div className="Logo_Holder">
        <h1>LOGO</h1>
      </div>
      <div className="SideBar_Actions">
        <ul>{PrintActions()}</ul>
      </div>
      <div className="shadow"></div>
    </nav>
  );
};

export default index;
