import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 8rem auto;

  height: 100%;
  color: ${({ theme }) => theme.color_white};

  @media (max-width: 1279px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const LeftContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  padding: 2rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.card_color};

  @media (max-width: 1023px) {
    flex: 2;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  .join-date {
    font-size: 1rem;
    line-height: 1.4;
  }
`;

export const ImageBox = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid #6c62e2;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Image = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
`;

export const UserName = styled.h3`
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color_white};

  @media (max-width: 1024px) {
    font-size: 1.3rem;
  }
`;

export const Role = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: capitalize;
  color: ${({ theme }) => theme.color_white};
`;
export const RightContent = styled.div`
  flex: 3;

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
