import styled from "styled-components";

export const CommentInfo = styled.div`
  width: 100%;
  min-height: 100px;
  padding: 1rem;
  border-radius: 20px;
  background: ${({ theme }) => theme.card_color};

  h5 {
    font-size: 1.1rem;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.color_white};
    margin-bottom: 0.5rem;
  }

  .content {
    word-break: break-all;
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.color_white};
    margin-bottom: 0.5rem;
    &::first-letter {
      text-transform: capitalize;
    }
  }

  .reply-button {
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.color_white};

    .reply {
      cursor: pointer;
      color: #6c62e2;
    }
  }
`;
