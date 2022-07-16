import React from "react";
import { Link } from "react-router-dom";


function Header(props) {
  return (
    <header>
      <h1>Noted</h1>
      <Link className = "logout" to = "/">{props.logout}</Link>
    </header>
  );
}

export default Header;
