import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../theme";

const NavbarContainer = styled.nav`
  background-color: ${theme.colors.card};
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${theme.shadow};
`;

const Logo = styled.h1`
  color: ${theme.colors.neonBlue};
  font-size: 24px;
  text-shadow: 0 0 5px ${theme.colors.neonBlue};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  transition: 0.3s;
  &:hover {
    color: ${theme.colors.neonBlue};
  }
`;

export default function Navbar() {
  return (
    <NavbarContainer>
      <Logo>冶金控制系统</Logo>
      <NavLinks>
        <NavLink to="/">仪表盘</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
}
