import React, { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

export const Slider = (props) => {
  const {
    def = 0,
    label = '進行波(W)',
    min = 0,
    max = 30,
    step = 0.5,
    onChange = () => {},
  } = props;
  const [val, setVal] = useState(def);
  const handleSliderChange = useCallback((e) => {
    setVal(e.target.value);
  }, []);
  useEffect(() => {
    onChange(val);
  }, [val]);
  return (
    <>
      <div className='w-full'>
        <label for='slider'>{label}:</label>
        <input
          type='range'
          className='w-full h-10'
          defaultValue={val}
          onChange={handleSliderChange}
          min={min}
          max={max}
          step={step}
          data-highlight='true'
        />
        <div className='w-full text-2xl text-right'>{val}</div>
      </div>
    </>
  );
};
