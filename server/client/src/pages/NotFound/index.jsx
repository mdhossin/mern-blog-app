import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.color_white};
  }
`;

const NotFound = () => {
  return (
    <Container>
      <h1>404 | Not Found</h1>
    </Container>
  );
};

export default NotFound;
