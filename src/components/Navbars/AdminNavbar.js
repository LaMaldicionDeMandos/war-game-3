/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
  NavbarBrand,
  Navbar,
} from "reactstrap";
import {Image} from "react-bootstrap";
import CurrentDate from "../CurrentDate";
import NextEventButton from "../NextEventButton";

import {useGlobalState, CURRENT_COUNTRY} from "../../contexts/GlobalState";

function AdminNavbar(props) {
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [color, setcolor] = React.useState("navbar-transparent");
  const [currentCountry] = useGlobalState(CURRENT_COUNTRY);

  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };
  return (
    <>
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <div className="navbar-wrapper">
          <NavbarBrand href="#" onClick={(e) => e.preventDefault()}>
            <Image src={`img/flags/${currentCountry?.code || 'onu'}.svg`} width={80} height={50}/>
          </NavbarBrand>
          <NavbarBrand href="#" onClick={(e) => e.preventDefault()}>
            {currentCountry?.name || props.brandText}
          </NavbarBrand>
        </div>
        <CurrentDate />
        <NextEventButton />
      </Navbar>
    </>
  );
}

export default AdminNavbar;
