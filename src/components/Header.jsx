import decode from "jwt-decode";
import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { setLogout } from "../redux/features/authSlice";
import { searchTours } from "../redux/features/TourSlice";
const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const [click, setClick] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
  };
  const navigate = useNavigate();

  // search
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchTours(search));
      navigate(`tours/search?searchQuery=${search}`);
      setSearch("")
    } else {
      navigate("/");
    }
  };
  // token 
  const token  = user?.token;
  if(token){
    const decodeToken = decode(token);
    if(decodeToken.exp * 1000 < new Date().getTime()){
      dispatch(setLogout());
    }
  }
  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#dbdfe2" }}>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{ color: "#FFFFFF", fontWeight: "800", fontSize: "22px" }}
        >
          <img
            style={{ width: "200px", height: "auto" }}
            className="img-fluid"
            src={logo}
            alt=""
          />
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          area-expended="false"
          aria-label="Toggle-navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#1a1919" }}
        >
          <MDBIcon
            onClick={() => setClick(!click)}
            icon={click ? "times" : "bars"}
            fas
          />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>

            {user?.result._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/addTour">
                    <p className="header-text">Add Tour</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-text">My Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}

            <MDBNavbarItem>
              <MDBNavbarLink>
                {user?.result?._id && (
                  <p className="header-text">
                    {" "}
                    <span style={{ fontWeight: "600" }}>
                      Logged in as {user?.result?.name}
                    </span>{" "}
                  </p>
                )}
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user?.result?._id ? (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p onClick={handleLogout} className="header-text log-out">
                    Log Out
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text ">Log in</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              name="search"
              className="form-control"
              placeholder="search tour"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              id=""
            />
            <div style={{ marginTop: "5px", marginLeft: "5px" }}>
              <MDBIcon fas icon="search" />
            </div>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
