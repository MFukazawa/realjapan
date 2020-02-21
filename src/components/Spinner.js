import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 0.5s cubic-bezier(0.78, 0.08, 0.83, 0.67) infinite;
  transform: translateZ(0);

  border-top: 2px solid #53ccd5;
  border-right: 2px solid #53ccd5;
  border-bottom: 2px solid #53ccd5;
  border-left: 2px solid #1995b9;
  background: transparent;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 0 0 0px;
  position: relative;
  left: 70px;
`;

export default Spinner;
