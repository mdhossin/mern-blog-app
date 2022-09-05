import styled from "styled-components";

export const Container = styled.section`
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

export const Wrapper = styled.div`
  display: grid;
  gap: 2rem;
  width: 100%;
`;
export const TopContent = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

export const RightPriview = styled.div`
  flex: 1;
  display: grid;
  gap: 1rem;
  width: 100%;
`;

export const PreviewContent = styled.div`
  h2 {
    margin-bottom: 1rem;
  }
  .content {
    background: ${({ theme }) => theme.form_background};
    box-shadow: 0 1px 4px hsla(0, 4%, 15%, 0.1);
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid rgba(141, 78, 245, 0.3);
  }
`;

export const SubmitButton = styled.div`
  button {
    background: #6c62e2;

    color: #fff;
    display: inline-block;

    padding: 1rem 3rem;

    font-size: 1rem;
    text-transform: capitalize;
    border-radius: 8px;
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;

    transition: 0.4s;
    overflow: hidden;

    &:hover {
      background: #5048ac;
    }
  }
`;
