import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 5px;
  background: ${({ theme }) => theme.form_background};
  height: 100%;

  margin: 0 auto;
  margin-top: 8rem;
  color: ${({ theme }) => theme.color_white};
  box-shadow: 0 3px 7px rgba(108, 98, 226, 0.1);

  @media (max-width: 767px) {
    max-width: 340px;
    padding: 2rem 1.5rem;
  }
  @media (max-width: 360px) {
    max-width: 300px;
  }
`;

export const Wrapper = styled.div``;
export const TopContent = styled.div`
  text-align: center;
  margin: 0 0 32px;

  span {
    font-size: 14px;
    line-height: 26px;
    margin: 10px 0 0;
    letter-spacing: 1px;
    font-weight: 600;

    a {
      transition: all 0.4s ease;

      &:hover {
        color: #6c62e2;
      }
    }
  }
`;
export const H2 = styled.h2`
  font-size: 36px;
  line-height: 1.44;
  font-weight: 700;
`;
export const FormWrapper = styled.form`
  .google-button {
    p {
      color: ${({ theme }) => theme.color_white};
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      margin-bottom: 20px;
    }
  }
`;

export const InputGroup = styled.div`
  position: relative;
  margin: 0 0 20px;
  width: 100%;
  height: 45px;

  small {
    position: absolute;
    top: 16px;
    right: 10px;
    color: #444;
    cursor: pointer;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 100%;
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

export const ForgotText = styled.div`
  text-align: end;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1.5rem;

  @media (max-width: 576px) {
    font-size: 12px;
  }
  @media (max-width: 360px) {
    flex-direction: column;
    gap: 0.6rem;
  }

  a {
    transition: all 0.4s ease;

    &:hover {
      color: #6c62e2;
    }
  }
`;

export const SmsText = styled.p`
  transition: all 0.4s ease;
  cursor: pointer;

  &:hover {
    color: #6c62e2;
  }
`;
