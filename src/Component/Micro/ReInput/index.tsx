import React from 'react';

interface InputProps {
  label: string;
  placeholder?: string;
  isArea?: boolean;
  value: string;
  onChange: (value: string) => void;
  isDark?: boolean;
  spaced?: boolean;
  areaHeight?: string;
  [x: string]: any;  // for all other props that might be passed to the input/textarea
}

const ReInput: React.FC<InputProps> = ({
  label,
  placeholder = '',
  isArea = false,
  value,
  onChange,
  isDark = false,
  spaced = false,
  areaHeight = '100px',
  ...otherProps
}) => {
  return (
    <div className={`${spaced && 'mb-[1rem]'}`}>
      <p className={`${isDark ? 'text-white' : 'text-[#464646]'} mb-[0.5rem] font-Avenir text-[14px] font-medium`}>
        {label}
        <sup className="">*</sup>
      </p>
      {
        isArea ?
          <textarea
            autoComplete="new-password"
            style={{ height: areaHeight }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full px-[1rem]  ${isDark ? 'bg-transparent text-white border-white/80' : 'border-black/30'} py-[0.5rem] border  focus:outline-none rounded-md`}
            {...otherProps}
          />
          :
          <input
            type="text"
            autoComplete="new-password"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full h-[3rem] ${isDark ? 'bg-transparent text-white border-white/80' : 'border-black/30'} px-[1rem] border  focus:outline-none rounded-md`}
            {...otherProps}
          />
      }
    </div>
  );
}

export default ReInput;
