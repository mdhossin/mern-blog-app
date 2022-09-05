import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  min-height: 200px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1.5rem;
  }

  color: ${({ theme }) => theme.color_white};

  .img-container {
    width: 100%;

    @media (max-width: 640px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media (min-width: 600px) {
      flex: 1;
    }
    .blog-img {
      max-width: 100%;
      height: 210px;
    }
  }
`;

export const BlogContent = styled.div`
  flex: 2;
  display: grid;
  gap: 1rem;

  .title {
    font-size: 1.3rem;
    text-transform: capitalize;
    line-height: 25px;
    word-break: break-all;
  }

  .desc {
    font-size: 1rem;
    text-transform: capitalize;
    line-height: 25px;
    word-break: break-all;
    font-weight: 400;
  }

  .edit-blog {
  }

  .date {
  }
`;
