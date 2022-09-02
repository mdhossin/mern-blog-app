import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  align-items: center;

  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 8rem;
  gap: 3rem;

  color: ${({ theme }) => theme.color_white};

  @media (max-width: 600px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

export const CategoryContent = styled.div`
  display: grid;
  gap: 2.5rem;
  width: 100%;
`;

export const CategoryForm = styled.form`
  width: 100%;

  button {
    margin-top: 0.5rem;
    width: 200px;
    height: 40px;
    font-size: 1rem;
    text-transform: capitalize;
    border-radius: 4px;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
    transition: 0.4s;
    background: #6c62e2;
    color: #fff;

    display: inline-block;

    &:hover {
      background: #5048ac;
    }
  }
`;
export const InputBox = styled.div`
  width: 100%;
  height: 40px;
  margin: 1rem 0;
`;
export const Input = styled.input`
  padding-left: 15px;
  width: 100%;
  height: 100%;
  border: 1px solid #6c62e2;
  outline: none;
  transition: 0.4s;
  border-radius: 4px;

  &:hover {
    border: 1px solid rgba(141, 78, 245, 0.8);
  }
  &:focus {
    border: 1px solid rgba(141, 78, 245, 0.8);
    box-shadow: 0px 2px 10px -1px rgba(141, 78, 245, 0.3);
  }
`;

export const CategoryList = styled.div`
  h2 {
    margin-bottom: 0.5rem;
  }
  .category-box {
    margin: 1rem 0;
    background: ${({ theme }) => theme.form_background};
    padding: 1rem;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    box-shadow: 0 3px 7px rgba(108, 98, 226, 0.1);

    h4 {
      font-size: 1rem;
      text-transform: capitalize;
    }

    .icon-group {
      display: flex;
      align-items: center;
      gap: 1rem;

      > div {
        cursor: pointer;
        svg {
          font-size: 1rem;
          transition: 0.4s;
          &:hover {
            color: #5048ac;
          }
        }
      }
    }
  }
`;
