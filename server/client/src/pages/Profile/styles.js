import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 4.5rem;
  gap: 3rem;
`;

export const ProfileContent = styled.div`
  margin-top: 2rem;
  flex: 1;
  display: grid;
  gap: 1rem;
  background: ${({ theme }) => theme.form_background};

  padding: 1.5rem;
  border-radius: 6px;
  box-shadow: 0 1px 4px hsla(0, 4%, 15%, 0.1);

  p {
    font-size: 0.9rem;
    margin-top: 0.8rem;
    color: red;
    font-weight: 700;
  }
`;
export const BlogContent = styled.div`
  flex: 2;
`;

export const ImageBox = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: relative;
  background: transparent;
  margin: 0 auto;
  border: 2px solid rgb(108, 98, 226);
  padding: 5px;

  border-radius: 50%;
  cursor: pointer;
  text-align: start;

  &:hover span {
    bottom: -15%;
    color: #fff;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    border-radius: 50%;
  }

  span {
    position: absolute;
    color: #ffff;
    bottom: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;

    font-weight: 400;
    text-transform: capitalize;
    transition: 0.3s ease-in-out;
    background-color: hsla(245, 41%, 48%, 0.568);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    svg {
      font-size: 1.3rem;
    }

    p {
      color: #fff;
      font-size: 14px;
      font-weight: 700;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      opacity: 0;
    }
  }
`;
export const Lablel = styled.label`
  display: inline-block;
  margin: 0.3rem 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color_white};
`;

export const InputGroup = styled.div`
  position: relative;
  margin: 0 0 20px;
  width: 100%;
  height: 45px;

  small {
    position: absolute;
    top: 42px;
    right: 10px;
    color: #444;
    cursor: pointer;
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

  &[type="email"]:disabled {
    background: ${({ theme }) => theme.disabledInputBg};
    cursor: not-allowed;
  }
  &[type="password"]:disabled {
    background: ${({ theme }) => theme.disabledInputBg};
    cursor: not-allowed;
  }

  &:hover {
    border: 1px solid rgba(141, 78, 245, 0.8);
  }
  &:focus {
    border: 1px solid rgba(141, 78, 245, 0.8);
    box-shadow: 0px 2px 10px -1px rgba(141, 78, 245, 0.3);
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 45px;
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
  margin-top: 1rem;

  &:hover {
    background: #5048ac;
  }
`;
