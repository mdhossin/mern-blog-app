import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  margin-top: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  .content {
    z-index: 2;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
  }
`;

export const Div = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 550px;
  z-index: 1;
  background: rgba(0, 0, 0, 0.8);
`;

export const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  line-height: 1.3;

  @media (max-width: 767px) {
    font-size: 3rem;
  }
`;
export const SubTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.3;

  @media (max-width: 767px) {
    font-size: 1.5rem;
  }

  span {
    color: #6c62e2;
    font-style: italic;
    font-weight: 700;
  }
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
