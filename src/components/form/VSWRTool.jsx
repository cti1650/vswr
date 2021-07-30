import React, { useState, useMemo, useRef } from 'react';
import { Slider } from '../slider/Slider';
import cc from 'classcat';

export const VSWRTool = (props) => {
  const { onClickSave = () => {} } = props;
  const [tx, setTx] = useState(0);
  const [rx, setRx] = useState(0);
  const descEl = useRef(null);
  const anser = useMemo(() => {
    return (
      Math.round(((1 + Math.sqrt(rx / tx)) / (1 - Math.sqrt(rx / tx))) * 100) /
        100 || 0
    );
  }, [tx, rx]);
  const handleClickSave = (e) => {
    const day = new Date();
    const res = {
      time: day.toLocaleString('ja-JP'),
      tx: tx,
      rx: rx,
      anser: anser,
      desc: descEl.current.value,
    };
    onClickSave(res);
  };
  return (
    <>
      <Slider
        def={tx}
        label='進行波(W)'
        onChange={(val) => {
          setTx(val);
        }}
      />
      <Slider
        def={rx}
        label='反射波(W)'
        max={4}
        step={0.1}
        onChange={(val) => {
          setRx(val);
        }}
      />

      <div
        className={cc([
          'py-3 text-5xl text-center font-bold',
          {
            'text-yellow-600': anser < 3 && anser >= 1.5,
            'text-red-700': anser >= 3,
            'text-blue-700': anser < 1.5 && anser > 0,
          },
        ])}
      >
        {anser}
      </div>
      <div className='w-full h-auto'>
        <label for='desc'>備考</label>
        <textarea
          className='w-full h-16 p-1 shadow-inner rounded-lg'
          id='desc'
          ref={descEl}
        ></textarea>
      </div>
      <div className='w-full h-20 p-4'>
        <button
          className='w-full h-full rounded-lg bg-gray-300 border shadow'
          onClick={handleClickSave}
        >
          保存
        </button>
      </div>
    </>
  );
};
