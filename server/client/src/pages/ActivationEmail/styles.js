import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 4.5rem);
  width: 100%;

  @media (max-width: 600px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

export const Content = styled.div`
  text-align: center;
`;

export const Error = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: red;
`;
export const Success = styled(Error)`
  color: #6c62e2;
`;

export const Button = styled.button`
  background: #6c62e2;
  color: #fff;
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1rem;
  text-transform: capitalize;
  border-radius: 8px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: 0.4s;
  overflow: hidden;

  &:hover {
    background: #5048ac;
  }
`;
