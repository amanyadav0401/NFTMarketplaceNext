import React from "react";
import Select from "react-select";

interface OptionType {
  value: string;
  label: string;
}

interface SelectInputProps {
  options: OptionType[];
  onChange: (selectedOption: OptionType | null) => void;
  value: OptionType | null;
}

const SelectInput: React.FC<SelectInputProps> = ({ options, onChange, value }) => {
  return (
    <Select
      options={options}
      onChange={onChange}
      value={value}
      className="w-full"
    />
  );
};

export default SelectInput;
