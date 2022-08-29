import styled from "styled-components";

export const Section = styled.section`
  margin-top: 4.5rem;
  text-align: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: ${({ theme }) => theme.form_background};
  color: ${({ theme }) => theme.color_white};

  @media (max-width: 600px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  box-shadow: 0 3px 7px rgba(108, 98, 226, 0.1);
  padding: 3rem 2rem;

  @media (max-width: 600px) {
    padding: 3rem 1.5rem;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.2rem;

    @media (max-width: 600px) {
      font-size: 1.7rem;
    }
  }

  p {
    margin-bottom: 1.2rem;
    font-size: 1rem;
  }

  form {
    input {
      padding-left: 15px;
      width: 100%;
      height: 42px;
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
    }
  }
`;

export const Button = styled.button`
  margin-top: 1.2rem;
  width: 100%;
  height: 42px;
  font-size: 1rem;
  text-transform: capitalize;
  border-radius: 4px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.4s;
  background: #6c62e2;
  color: #fff;

  display: inline-block;

  &:hover {
    background: #5048ac;
  }
`;
