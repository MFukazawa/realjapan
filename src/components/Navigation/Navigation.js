import React from "react";
import styled from "styled-components";

const Navigation = () => {
  return (
    <Nav>
      <Link href="#">Login</Link>
    </Nav>
  );
};

const Nav = styled.nav`
  font-size: 1.5em;
  text-align: right;
  padding: 1em;
`;

const Link = styled.a`
  text-decoration: none;
  color: #3400ff;
`;

export default Navigation;
