import React, { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import MaterialSlider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

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
  const handleSliderChange = useCallback((e, val) => {
    setVal(val);
  }, []);
  const handleInputChange = useCallback((event) => {
    setVal(event.target.value === '' ? '' : Number(event.target.value));
  }, []);

  const handleBlur = useCallback(() => {
    if (val < min) {
      setVal(min);
    } else if (val > max) {
      setVal(max);
    }
  }, []);
  useEffect(() => {
    onChange(val);
  }, [val]);
  return (
    <>
      <div className='w-full'>
        <Typography id='input-slider' gutterBottom>
          {label}
        </Typography>
        <Grid container className='pt-8' spacing={2} alignItems='center'>
          <Grid item xs>
            {/* <input
          type='range'
          className='w-full h-10'
          defaultValue={val}
          onChange={handleSliderChange}
          min={min}
          max={max}
          step={step}
          data-highlight='true'
        /> */}
            <MaterialSlider
              defaultValue={def}
              value={val}
              onChange={handleSliderChange}
              min={min}
              max={max}
              step={step}
              valueLabelDisplay='auto'
            />
          </Grid>
          <Grid item>
            <Input
              className='w-16 text-2xl text-right'
              value={val}
              margin='dense'
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: step,
                min: min,
                max: max,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
