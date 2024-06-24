import * as React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import avatar from "../../../src/assets/Images/avatar.png";
import { FaChevronDown } from "react-icons/fa"; // Import an arrow icon
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "@redux/account/types";

export default function PositionedMenu() {
  const { user } = useSelector((data) => data.account);
  const dispatch = useDispatch();

  const handelLogout = () => {
    dispatch({ type: LOGOUT });
  };
  return (
    <Dropdown>
      <Dropdown.Toggle
        as={CustomToggle}
        id="dropdown-custom-components"
        style={{ textDecoration: "none !important" }}
      >
        <div className="d-flex align-items-center">
          <Image src={avatar} roundedCircle width={40} />
          <p className="mx-3 my-0 text-black">{user.useName}</p>
          <FaChevronDown color="black" />
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handelLogout}>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="custom-dropdown-toggle"
  >
    {children}
  </a>
));
