import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Input, InputWrapper } from "./styles";

const SearchInput = () => {
  return (
    <>
      <InputWrapper>
        <AiOutlineSearch />
        <Input type="text" placeholder="Enter your search..." />
      </InputWrapper>
    </>
  );
};

export default SearchInput;
