import styled from "styled-components";
export const InputWrapper = styled.div`
  position: relative;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1.3;
  @media (max-width: 768px) {
    flex-grow: 2;
  }
  @media (max-width: 576px) {
    display: none;
  }
  svg {
    position: absolute;
    z-index: 100;
    color: #333;
    top: 50%;
    left: 3%;

    font-size: 20px;
    transform: translateY(-50%);
    stroke: red;
  }
`;
export const Input = styled.input`
  position: absolute;
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  border: 1px solid #6c62e2;
  padding: 0 15px 0 40px;
  color: #444;
  font-size: 15px;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.4s ease;

  &:hover {
    border: 1px solid rgba(141, 78, 245, 0.8);
  }
  &:focus {
    border: 1px solid rgba(141, 78, 245, 0.8);
    box-shadow: 0px 2px 10px -1px rgba(141, 78, 245, 0.3);
  }
`;
