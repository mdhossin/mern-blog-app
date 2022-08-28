import {
  Nav,
  NavItem,
  NavLinks,
  NavLogo,
  NavMain,
  NavMenu,
  DropdownList,
  DorpdownItem,
  DropdownLinkItem,
  Wrapper,
  OpenMenuWrapper,
  ThemeWrapper,
  Backdrop,
  NavbarClose,
  UserImage,
  LogoutButton,
} from "./styles";

import ThemeSwitcher from "../ToggleSwitcher";
import { useState } from "react";
import { HiX } from "react-icons/hi";
import { CgMenuLeft } from "react-icons/cg";
import { useSelector } from "react-redux";
import SearchInput from "../SearchInput/inxex";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user?.userInfo);
  return (
    <>
      <Nav>
        <NavMain>
          <Wrapper>
            <NavLogo to="/">
              <svg
                fill="#6C62E2"
                x="0px"
                y="0px"
                width="40px"
                height="40px"
                viewBox="0 0 97.75 97.75"
              >
                <g>
                  <g>
                    <path
                      d="M36.491,40.31c0,0,13.827-0.006,13.858-0.006c3.201,0,5.82-2.344,5.873-5.556c0.051-3.244-2.537-6.15-5.781-6.201
			l-13.766,0.016c-3.249-0.031-5.914,2.537-5.966,5.78C30.658,37.586,33.247,40.258,36.491,40.31z"
                    />
                    <path
                      d="M62.55,55.48H35.021c-3.244,0-5.875,2.631-5.875,5.875s2.631,5.873,5.875,5.873H62.55c3.244,0,5.875-2.629,5.875-5.873
			S65.794,55.48,62.55,55.48z"
                    />
                    <path
                      d="M48.875,0C21.883,0,0,21.882,0,48.875S21.883,97.75,48.875,97.75S97.75,75.868,97.75,48.875S75.867,0,48.875,0z
			 M76.777,77.021c-3.776,3.889-9.108,5.972-15.42,6.024h-0.059H36.688c-0.155,0.002-0.31,0.003-0.463,0.003
			c-7.074,0-12.534-1.994-16.227-5.927c-3.694-3.935-4.878-9.256-4.878-16.649c0.007-0.51-0.042-1.006-0.011-1.496l0.013-25.991
			c0.305-6.445,3.185-10.431,5.353-12.713c3.503-3.689,8.455-5.56,14.721-5.56h0.174L51.48,14.7l0.15,0.004
			c10.533,0.292,18.123,7.623,18.197,17.822c0.275,3.063,0.104,5.896-0.493,8.452c3.541,0.105,7.91,0.725,10.741,4.383
			c2.5,3.23,2.516,6.903,2.537,11.985c0.006,1.04,0.035,3.688,0.035,3.688C82.579,67.613,80.549,73.143,76.777,77.021z"
                    />
                  </g>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </svg>
            </NavLogo>

            <SearchInput />

            <NavMenu className={`mobile-menu ${menuOpen ? "show-menu" : ""}`}>
              <NavItem>
                <NavLinks onClick={() => setMenuOpen(false)} to="/">
                  Home
                </NavLinks>
              </NavItem>
              {user?.user && (
                <NavItem>
                  <NavLinks
                    onClick={() => setMenuOpen(false)}
                    to="/create-blog"
                  >
                    Create Blog
                  </NavLinks>
                </NavItem>
              )}
              {user?.user ? (
                <NavItem>
                  {/* <NavLinks to="">Home</NavLinks> */}
                  <UserImage src={user?.user?.avatar} />
                  <DropdownList>
                    <DorpdownItem>
                      <DropdownLinkItem
                        onClick={() => setMenuOpen(false)}
                        to="/"
                      >
                        Profile
                      </DropdownLinkItem>
                    </DorpdownItem>
                    <DorpdownItem>
                      <LogoutButton onClick={() => setMenuOpen(false)}>
                        Logout
                      </LogoutButton>
                    </DorpdownItem>
                  </DropdownList>
                </NavItem>
              ) : (
                <NavItem>
                  <NavLinks onClick={() => setMenuOpen(false)} to="/login">
                    Login / Register
                  </NavLinks>
                </NavItem>
              )}

              <NavbarClose
                theme={theme.darkMode}
                onClick={() => setMenuOpen(false)}
              >
                <HiX />
              </NavbarClose>
            </NavMenu>

            <ThemeWrapper>
              <ThemeSwitcher />

              <OpenMenuWrapper
                theme={theme.darkMode}
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <CgMenuLeft />
              </OpenMenuWrapper>
            </ThemeWrapper>
          </Wrapper>
        </NavMain>
      </Nav>

      <Backdrop>
        <div
          onClick={() => setMenuOpen((prev) => !prev)}
          className={`backdrop ${menuOpen ? "backdrop-open" : "backdrop"}`}
        ></div>
      </Backdrop>
    </>
  );
};
export default Navbar;
