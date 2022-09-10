import styled from "styled-components";

export const CommentContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 6rem auto;
  margin-top: 0;

  height: 100%;
  color: ${({ theme }) => theme.color_white};

  border-radius: 8px;

  @media (max-width: 1279px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: 1399px) {
    max-width: 1200px;
  }
`;
