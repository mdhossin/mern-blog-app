import styled from "styled-components";

export const LeftFromBox = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.form_background};
  box-shadow: 0 1px 4px hsla(0, 4%, 15%, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  height: fit-content;
  width: 100%;
  border: 1px solid rgba(141, 78, 245, 0.3);

  display: grid;
  gap: 1rem;

  .upload-image {
    position: relative;
    height: 80px;
    border: 1px solid rgba(141, 78, 245, 0.3);
    width: 100%;
    overflow: hidden;
    border-radius: 5px;
    .upload {
      #file_up {
        width: 100%;
        height: 100%;
        outline: none;
        border-radius: 5px;

        &::before {
          content: url("./upload.svg");
          position: absolute;
          width: 100%;
          height: 80px;
          top: 0;
          left: 0;
          background: white;
          border-radius: 5px;
          text-align: center;
          cursor: pointer;
          z-index: 10;

          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .file_img {
        position: absolute;
        top: 10px;
        left: 45%;
        z-index: 10;
        background: #ffffff;
      }
    }
  }

  .category {
    width: 100%;

    select {
      height: 40px;
      padding: 0 14px;
      width: 100%;

      border: 1px solid rgba(141, 78, 245, 0.8);

      transition: 0.4s;
      border-radius: 4px;

      outline: none;

      &:focus {
        border: 1px solid rgba(141, 78, 245, 0.8);
        box-shadow: 0px 2px 10px -1px rgba(141, 78, 245, 0.3);
      }

      option {
        font-weight: 500;

        font-size: 0.9rem;
      }
    }
  }
`;

export const InputGroup = styled.div`
  .title {
    position: relative;

    small {
      position: absolute;
      top: 12px;
      right: 5px;

      font-size: 12px;
      color: #444;
    }
  }
  textarea {
    position: relative;
    padding: 15px;
    width: 100%;
    /* height: 130px; */
    border: 1px solid #6c62e2;
    outline: none;
    transition: 0.4s;
    border-radius: 4px;
    resize: none;

    &:hover {
      border: 1px solid rgba(141, 78, 245, 0.8);
    }
    &:focus {
      border: 1px solid rgba(141, 78, 245, 0.8);
      box-shadow: 0px 2px 10px -1px rgba(141, 78, 245, 0.3);
    }
  }
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
`;

export const InputBox = styled.div`
  width: 100%;
  height: 40px;
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
