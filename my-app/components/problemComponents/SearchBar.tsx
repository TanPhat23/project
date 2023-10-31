"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <Input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;
