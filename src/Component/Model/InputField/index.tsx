import React, { ChangeEvent } from "react";

interface ReusableInputProps {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
  textColor?: string;
  labelColor?: string;
  readonly?: boolean;
}

const InputField: React.FC<ReusableInputProps> = ({ label, type, value, placeholder, error, onChange, readonly, textColor, labelColor }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const inputStyles = `w-full px-3 py-2 rounded border border-gray-500 hover:border-slate-400 bg-gray-600 bg-opacity-10 ${textColor || "text-white"}`;

  const labelStyles = `block mb-1 ${labelColor || "text-white"}`

  return (
    <div className="mb-4">
      <label className={labelStyles}>{label}</label>
      <input
        type={type}
        value={value}
        readOnly={readonly}
        autoComplete="new-password"
        onChange={handleChange}
        placeholder={placeholder}
        className={inputStyles}
      />
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
