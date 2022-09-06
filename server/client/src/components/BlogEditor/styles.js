import styled from "styled-components";

export const Wrapper = styled.div`
  margin-bottom: 0.5rem;
  h2 {
    margin-bottom: 1.2rem;
    margin-top: 0;
    line-height: 15px;
  }
  .ql-editor {
    min-height: 150px;
    word-break: break-all;
  }

  .ql-container.ql-snow {
    border: 1px solid rgba(141, 78, 245, 0.3);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .ql-picker-label {
    color: ${({ theme }) => theme.color_white};
  }

  .ql-snow .ql-stroke {
    /* fill: ${({ theme }) => theme.color_white}; */
    stroke: ${({ theme }) => theme.color_white};
  }

  .ql-snow .ql-fill {
    fill: ${({ theme }) => theme.color_white};
  }

  .ql-picker-options {
    border-color: gray;
    background: ${({ theme }) => theme.form_background};
    color: ${({ theme }) => theme.color_white};
  }

  .ql-toolbar.ql-snow {
    border: 1px solid rgba(141, 78, 245, 0.3);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;
