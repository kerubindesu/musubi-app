import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { InputSearch } from "../../atoms";

const TableSearch = ({ globalFilter, setGlobalFilter, setKeyword }) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
    setKeyword(value);
  }, 300);

  return (
    <InputSearch
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={"Ketik sesuatu..."}
    />
  );
};

export default TableSearch;