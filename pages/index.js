import Link from 'next/link';
import Head from 'next/head';
import { Slider } from '../src/components/slider/Slider';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import cc from 'classcat';

export default function IndexPage() {
  const [tx, setTx] = useState(0);
  const [rx, setRx] = useState(0);
  const [ans, setAns] = useState(0);
  const router = useRouter();
  const anser = useMemo(() => {
    return (
      Math.round(((1 + Math.sqrt(rx / tx)) / (1 - Math.sqrt(rx / tx))) * 100) /
      100
    );
  }, [tx, rx]);
  return (
    <div className='continer'>
      <Head>
        <link rel='apple-touch-icon' href='VS.png' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='VSWR' />
        <title>ＶＳＷＲ計算ツール</title>
        <meta name='viewport' content='user-scalable=no' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0'
        />
        <link rel='icon' href='/VS.png' />
      </Head>
      <div className='text-4xl text-center'>VSWR</div>
      <div className='w-full pt-8'>
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
      </div>
      <div
        id='val'
        className={cc([
          'text-6xl text-center',
          {
            'text-yellow-600': anser < 3 && anser >= 1.5,
            'text-red-700': anser >= 3,
            'text-blue-700': anser < 1.5 && anser > 0,
          },
        ])}
      >
        {anser}
      </div>
      <div className='w-full text-center pt-10'>
        <img
          className='mx-auto'
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${router.asPath}&size=100x100`}
        />
      </div>
    </div>
  );
}
