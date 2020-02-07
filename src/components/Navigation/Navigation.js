import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  ${'' /* padding: 4em; */}
  height: 100vh;
  width: 100vw;
  background: linear-gradient(123deg, #2E99B0 0%, #2E99B0 40%, #FCD77F calc(40% + 1px), #FCD77F 60%, #FF2E4C calc(60% + 1px), #FF2E4C 75%, #1E1548 calc(75% + 1px), #1E1548 100%);
`

const Nav = styled.nav`
  font-size: 1.5em;
  text-align: right;
  color: white;
`

const Link = styled.a`
  color: white;
  text-decoration: none;
`

const Navigation = () => {
  return (
    <Wrapper>
      <Nav>
        <Link href="#">Login</Link>
      </Nav> 
    </Wrapper>
  );
}

export default Navigation;