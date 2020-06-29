import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./profileicon.css";
import { LOGOUT } from "../../constants/constants";

const ProfileIcon = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const routeChange = props.onRouteChange;
  const logout = () => {
    fetch(LOGOUT, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token"),
      },
    })
      .then((resp) => {
        if (resp.status === 200) {
          window.sessionStorage.removeItem("token");
          routeChange("signout");
        }
      })
      .catch(console.log());
  };

  return (
    <div className={"pa4 tc"}>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          tag="span"
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}
        >
          <img
            src="http://tachyons.io/img/logo.jpg"
            className={"br-100 ba h3 w3 dib"}
            alt="avatar"
          />
        </DropdownToggle>
        <DropdownMenu
          className={"b--transparent shadow-5 dropdown-menu-right"}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <DropdownItem className={"outline-0"} header>
            Profile
          </DropdownItem>
          <DropdownItem style={{ outline: "none" }} onClick={props.toggleModal}>
            View profile
          </DropdownItem>
          <DropdownItem style={{ outline: "none" }} onClick={logout}>
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileIcon;
