import styled from "styled-components";
import { Link } from "react-router-dom";
export const Card = styled.div`
  border-radius: 6px;
  background: ${({ theme }) => theme.card_color};
  transition: 0.4s;

  &:hover {
    box-shadow: 0 3px 7px rgba(108, 98, 226, 0.3);
  }
`;
export const CardImg = styled.img`
  width: 100%;
  height: 260px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

export const ContentWrapper = styled.div`
  padding: 1rem 1.2rem 1.5rem 1.2rem;
`;

export const TopContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.4rem;
`;
export const WritenBy = styled.h4`
  font-size: 12px;
  font-weight: 500;
  font-style: italic;
`;

export const Publised = styled.p`
  font-size: 12px;
  font-style: italic;
`;
export const Heading = styled.h2`
  margin-bottom: 0.7rem;
  font-size: 1.5rem;
  line-height: 1.3;
  transition: all 0.4s ease;

  &:hover {
    color: #6c62e2;
    cursor: pointer;
  }
`;
export const Description = styled.p`
  font-size: 1rem;
  line-height: 1.2;
  margin-bottom: 1rem;
`;

export const Button = styled(Link)`
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
`;
