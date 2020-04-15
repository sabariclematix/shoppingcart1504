import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const Navbar = props => {
  return (
    <nav className="nav-wrapper">
      <div className="container">
        <Link to="/cart" className="brand-logo">
          Shopping
        </Link>

        <ul className="right">
          <li>
            <Link to="/cart" className={"nav-wrapper-link"}>
              {props.items.length != 0 ? (
                <span className={"nav-wrapper__round"}>
                  {props.items.length}
                </span>
              ) : null}
              <i className="material-icons">shopping_cart</i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    items: state.addedItems
  };
};

export default connect(mapStateToProps)(Navbar);
