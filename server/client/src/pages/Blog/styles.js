import styled from "styled-components";
export const Wrapper = styled.section`
  width: 100%;
  max-width: 1100px;
  margin: 6rem auto;
  margin-bottom: 2rem;
  padding: 1.5rem;
  height: 100%;
  color: ${({ theme }) => theme.color_white};
  background: ${({ theme }) => theme.card_color};

  border-radius: 8px;

  @media (max-width: 1279px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: 1399px) {
    padding: 2rem;
    max-width: 1200px;
  }

  p {
    line-height: 1.5;
  }
`;

export const BlogContent = styled.div`
  width: 100%;
  word-break: break-all;
`;
export const ImageContainer = styled.div`
  width: 100%;
  height: 500px;

  @media (max-width: 600px) {
    height: 350px;
  }
`;
export const Image = styled.img`
  width: 100%;
  height: inherit;
`;

export const TopContent = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 320px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    text-transform: capitalize;
    word-break: break-all;

    @media (max-width: 600px) {
      font-size: 1.2rem;
    }
    @media (max-width: 320px) {
      font-size: 1.5rem;
    }
  }

  p {
    font-size: 14px;
    font-weight: 400;
    text-transform: capitalize;
    font-style: italic;
    @media (max-width: 600px) {
      font-size: 12px;
    }
    @media (max-width: 320px) {
      font-size: 14px;
    }

    span {
      color: #6c62e2;
    }
  }
`;

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

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    a {
      color: #6c62e2;
      text-decoration: underline;
    }
  }
`;
