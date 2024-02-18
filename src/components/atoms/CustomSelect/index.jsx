import React from 'react';
import Select from 'react-select';

const CustomSelect = ({ options, value, onChange, placeholder, menuPlacement, getOptionValue, isMulti }) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      menuPlacement={menuPlacement}
      getOptionValue={getOptionValue} // Tetapkan properti getOptionValue di sini
      isMulti={isMulti}
        theme={(theme) => ({
            ...theme,
            colors: {
                ...theme.colors,
                primary25: "#eeeeee",
                primary: "#eeeeee",
            },
            })}
            styles={{
            input: (base) => ({
                ...base,
                "input: focus": {
                boxShadow: "none",
                },
            }),
            }}
            className="z-10 w-full"
    />
  );
};

export default CustomSelect;