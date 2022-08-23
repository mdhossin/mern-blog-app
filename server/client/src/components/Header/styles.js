import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  width: 100%;
  background: rgba(255, 255, 255, 0.25);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  transition: 0.4s; /*For animation dark mode*/
  box-shadow: 0 1px 4px hsla(0, 4%, 15%, 0.1);
`;

export const NavMain = styled.div`
  width: 100%;

  background: ${(props) => props.theme.background};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  .mobile-menu {
    @media (max-width: 1023px) {
      /* background: url("../../assets/bgWhite.png"); */

      visibility: hidden;
      position: fixed;
      top: 0;
      right: -100%;
      background-color: ${({ theme }) => theme.mobile_background};
      height: 100vh;
      width: 450px;
      z-index: 1000;
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 3rem;

      padding: 2rem 2rem 3.5rem 2rem;
      transition: 0.5s;
      @media (max-width: 576px) {
        width: 88%;
        top: 0;
      }
    }
  }

  /* Show menu */
  .show-menu {
    right: 0;
    visibility: visible;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.3rem;
  height: 4.5rem;

  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  @media (min-width: 1200px) {
    padding: 1rem 0;
  }
`;

export const NavLogo = styled(Link)`
  display: flex;
  flex-grow: 1;
`;

export const InputWrapper = styled.div`
  position: relative;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1.3;
  @media (max-width: 768px) {
    flex-grow: 2;
  }
  @media (max-width: 576px) {
    display: none;
  }
  svg {
    position: absolute;
    z-index: 100;
    color: #333;
    top: 50%;
    left: 3%;

    font-size: 20px;
    transform: translateY(-50%);
    stroke: red;
  }
`;
export const Input = styled.input`
  position: absolute;
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  border: 1px solid #6c62e2;
  padding: 0 15px 0 40px;
  color: #444;
  font-size: 15px;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.4s ease;

  &:hover {
    border: 1px solid rgba(141, 78, 245, 0.8);
  }
  &:focus {
    border: 1px solid rgba(141, 78, 245, 0.8);
    box-shadow: 0px 2px 10px -1px rgba(141, 78, 245, 0.3);
  }
`;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 25px;
`;

export const DropdownList = styled.ul``;

export const NavMenu = styled.ul`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 100;
  flex-grow: 0.2;

  ${DropdownList} {
    position: absolute;
    top: 48px;
    opacity: 0;
    visibility: hidden;
    transition: 0.5s;
    background: rgb(26, 35, 43);
    padding: 22px 20px 22px 25px;
    width: 270px;
    border-radius: 6px;
    z-index: 1;
  }
`;

export const NavItem = styled.li`
  &:not(:last-child) {
    margin-right: 24px;
  }
  &:nth-child(3) {
    margin-right: 0px;
  }

  &:hover > ${DropdownList} {
    opacity: 1;
    visibility: visible;
    box-shadow: -11px 6px 26px -14px rgba(0, 0, 0, 0.75);
  }
`;

export const NavbarClose = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  svg {
    font-size: 24px;
    color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#444")};
    font-weight: 700;
  }
  @media (min-width: 1023px) {
    display: none;
  }
`;

export const DropdownLinkItem = styled(Link)`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #ffffff;
  display: flex;
  align-items: center;
  transition: 0.5s;
`;

export const DorpdownItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 30px;
  }

  &:hover ${DropdownLinkItem} {
    padding-left: 3px;
  }
`;

export const NavLinks = styled(Link)`
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.color_white};
  padding: 6px 0;
  transition: all 0.5s ease;

  &:hover {
    color: #6c62e2;
  }
`;

export const OpenMenuWrapper = styled.div`
  margin-left: 20px;
  svg {
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#444")};
  }
  @media (min-width: 1024px) {
    display: none;
  }
`;

export const ThemeWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-grow: 0.5;
    justify-content: flex-end;
  }
`;

export const Backdrop = styled.div`
  .backdrop {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
    visibility: hidden;
    opacity: 0;
    transition: 0.5s;
  }

  .backdrop-open {
    visibility: visible;
    opacity: 1;
  }
`;
