import React, { useState, useEffect, useRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  placeholder: string;
  onSelect: (value: string) => void;
  selectedValue?: string | null;
  name?: string;
  endButtonTitle?: string;
  onEndButtonClick?: () => void;
}

const ReDropDown: React.FC<DropdownProps> = ({
  options, name, endButtonTitle, onEndButtonClick,
  placeholder, onSelect, selectedValue
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === selectedValue);

  useEffect(() => {
    const handlePositioning = () => {
      if (dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        // Calculate the height of the dropdown content
        const dropdownContentHeight = 200; // You can calculate or set this dynamically

        // Decide to drop up only if there is not enough space below 
        // AND there is more space above OR there isn't enough space below and above
        if (spaceBelow < dropdownContentHeight && (spaceAbove > spaceBelow || spaceAbove < dropdownContentHeight)) {
          setDropUp(true);
        } else {
          setDropUp(false);
        }
      }
    };

    handlePositioning();
    window.addEventListener('resize', handlePositioning);
    window.addEventListener('scroll', handlePositioning, true);

    return () => {
      window.removeEventListener('resize', handlePositioning);
      window.removeEventListener('scroll', handlePositioning, true);
    };
  }, []);


  useEffect(() => {
    const scrollbarWidth = getScrollbarWidth();
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen]);

  const getScrollbarWidth = () => {
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    document.body.appendChild(outer);

    const widthNoScroll = outer.offsetWidth;
    // make them scrollable
    outer.style.overflow = "scroll";

    const inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    const widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode?.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  };

  return (
    <div className='w-full select-none relative' ref={dropdownRef}>
      <p className='text-[#464646] mb-[0.5rem] font-Avenir text-[14px] font-medium'>
        {name || 'Select an option'}<sup>*</sup>
      </p>
      <div
        className='w-full h-[3rem] px-[1rem] border border-black/30 justify-between focus:outline-none flex items-center rounded-md cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className='text-[#464646] text-opacity-50 font-Avenir text-[14px] font-medium'>
          {selectedOption?.label || placeholder}
        </p>
        <BiChevronDown size={20} />
      </div>
      {isOpen && (
        <div
          className={`absolute ${dropUp ? 'bottom-[3.5rem]' : 'top-[5.5rem]'} z-[20] bg-white left-0 w-full max-h-[12rem] overflow-y-auto border border-black/30 rounded-md`}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className='w-full h-[3rem] px-[1rem] border-b border-black/30 focus:outline-none flex items-center cursor-pointer'
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
            >
              <p className='text-[#464646] font-Avenir text-[14px] font-medium'>
                {option.label}
              </p>
            </div>
          ))}
          {options.length === 0 && (
            <div className='w-full h-[3rem] px-[1rem] border-b border-black/30 focus:outline-none flex items-center cursor-pointer'>
              <p className='text-[#464646] font-Avenir text-[14px] font-medium'>
                No options available
              </p>
            </div>
          )}
          {endButtonTitle && (
            <div
              className='w-full h-[3rem] px-[1rem] border-b border-black/30 focus:outline-none flex items-center cursor-pointer'
              onClick={() => {
                if (onEndButtonClick) onEndButtonClick();
                setIsOpen(false);
              }}
            >
              <p className='text-[#E377FF] font-Avenir text-[14px] font-medium'>
                {endButtonTitle}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ReDropDown;
