import React from 'react';

export const Slider = (props) => {
  return (<>
    <label for="slider">進行波(W):</label>
    <input type="range" name="slider" id="slider" value="0" min="0" max="30" step="0.5" data-highlight="true" />
  </>);
};