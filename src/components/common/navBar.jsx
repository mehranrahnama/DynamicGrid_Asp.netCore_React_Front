import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    const mystyle = {
      paddingleft:320,
  paddingright:30,
      marginBottom: 20
    };
    return (
      <React.Fragment>
        <nav className="main-header navbar navbar-expand bg-white navbar-light border-bottom">
          <ul className="navbar-nav">
           
            <li className="nav-item d-none d-sm-inline-block nav-item-home">
            <Link
            to="#"
            style={{ mystyle  }}
            >
           خانه
          </Link>
            </li>

            <li className="nav-item d-none d-sm-inline-block nav-item-currentUser">
            <Link
            to="#"
            style={mystyle}
          >
           کاربر جاری :
          </Link>
            </li>

            <li className="nav-item d-none d-sm-inline-block">
            <Link
            to="#"
            style={{ marginBottom: 20 }}
          >
            خروج 
          </Link>
            </li>
          </ul>

          {/* <form className="form-inline ml-3">
            <div className="input-group input-group-sm">
              <input
                className="form-control form-control-navbar"
                type="search"
                placeholder="جستجو"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-navbar" type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form> */}


        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;