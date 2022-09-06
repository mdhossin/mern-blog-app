import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 4rem auto;

  height: 100%;
  color: ${({ theme }) => theme.color_white};

  @media (max-width: 1279px) {
    margin-top: 2.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

export const Wrapper = styled.div`
  .category {
    margin-bottom: 3rem;
  }
`;
export const Heading = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  border-bottom: 1px solid ${({ theme }) => theme.border_color};
  padding-bottom: 0.5rem;
  color: ${({ theme }) => theme.heading_color};
  cursor: pointer;
  word-break: break-all;
  text-transform: capitalize;

  span {
    font-size: 1rem;
  }
`;
export const Content = styled.div`
  padding-top: 1.5rem;
  display: grid;
  gap: 1.5rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 968px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
