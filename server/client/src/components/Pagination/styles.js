import styled from "styled-components";

export const Nav = styled.nav`
  .pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    margin: 2rem 0;

    .active {
      background: transparent;
      border: 1px solid rgb(80, 72, 172);
      color: ${({ theme }) => theme.color_white};
    }

    li {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgb(80, 72, 172);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
  }
`;
