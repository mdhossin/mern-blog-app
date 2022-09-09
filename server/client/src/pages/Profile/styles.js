import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 6rem auto;

  height: 100%;
  color: ${({ theme }) => theme.color_white};

  @media (max-width: 1279px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

export const BlogContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;

  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

export const ProfileContent = styled.div`
  margin-top: 2rem;
  flex: 1;
  width: 100%;
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

  .loader {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
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

export const BlogContent = styled.div`
  margin-top: 2rem;
  flex: 2;

  .content-box {
    display: grid;
    gap: 1rem;

    @media (max-width: 1023px) {
      flex: 2;

      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    }
  }
`;

export const Card = styled.div`
  display: flex;
  align-items: flex-start;

  gap: 1.5rem;

  border-radius: 6px;
  background: ${({ theme }) => theme.card_color};

  @media (min-width: 1023px) {
    padding: 1rem;
  }

  @media (max-width: 1023px) {
    flex-direction: column;
  }
`;
export const ImgBox = styled.div`
  flex: 1;
  height: 200px;
  width: 100%;
  margin: 0 auto;
  @media (min-width: 1023px) {
    width: 280px;
    height: 200px;
  }
`;
export const BlogImage = styled.img`
  max-width: 100%;
  height: 200px;
  @media (min-width: 1023px) {
    width: 280px;
    height: 200px;
  }
`;
export const Content = styled.div`
  flex: 2;

  @media (max-width: 768px) {
    padding: 0 1rem 1rem 1rem;
  }
`;
export const Title = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color_white};
  text-transform: capitalize;
  margin-bottom: 1rem;
  transition: 0.3s;
  word-break: break-all;

  &:hover {
    color: #6c62e2;
  }
`;
export const Descritpion = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.infoColor};
  word-break: break-all;
`;
export const JoinDate = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.infoColor};
`;
