import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Input, InputWrapper } from "./styles";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <InputWrapper>
        <AiOutlineSearch />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Enter your search..."
        />
      </InputWrapper>
    </>
  );
};

export default SearchInput;
