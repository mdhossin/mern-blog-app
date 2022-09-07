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

export const Wrapper = styled.div``;
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
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
`;

export const ReadMore = styled.div`
  margin-bottom: 3rem;
  margin-top: 1.5rem;

  a {
    background: #6c62e2;

    color: #fff;
    display: inline-block;

    padding: 0.8rem 2rem;

    font-size: 1rem;
    text-transform: capitalize;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: 0.4s;
    overflow: hidden;

    &:hover {
      background: #5048ac;
    }
  }
`;
