import styled from "styled-components";

export const Container = styled.footer`
  width: 100%;
  height: 400px;
  background: ${({ theme }) => theme.card_color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  justify-content: center;
  align-items: center;
`;

export const UsefulLinks = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Left = styled.div`
  a {
    font-size: 1rem;
    font-weight: 700;
    color: interit;
    color: ${({ theme }) => theme.color_white};

    transition: all 0.5s ease;

    &:hover {
      color: #6c62e2;
    }
  }
`;
export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  > div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #6c62e2;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.4s;

    &:hover {
      background: #5048ac;
    }

    svg {
      font-size: 20px;
      color: #fff;
    }
  }
`;
export const CopyRight = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.color_white};
  margin-top: 3rem;
`;
