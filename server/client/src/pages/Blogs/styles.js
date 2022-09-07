import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 8rem auto;

  height: 100%;
  color: ${({ theme }) => theme.color_white};

  @media (max-width: 1279px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  h2 {
    font-size: 2rem;
    text-transform: capitalize;
    margin-bottom: 0.5rem;
  }
`;

export const Content = styled.div`
  padding-top: 1.5rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
`;
