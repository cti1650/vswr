import Link from 'next/link';
import Head from 'next/head';
import { Slider } from '../src/components/slider/Slider';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useLocalStorage } from '../src/hooks/useLocalStorage';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import cc from 'classcat';

export default function IndexPage() {
  const [tx, setTx] = useState(0);
  const [rx, setRx] = useState(0);
  const descEl = useRef(null);
  const [keep, setKeep] = useLocalStorage('keep', []);
  const router = useRouter();
  const [qr, setQR] = useState('');
  const anser = useMemo(() => {
    return (
      Math.round(((1 + Math.sqrt(rx / tx)) / (1 - Math.sqrt(rx / tx))) * 100) /
        100 || 0
    );
  }, [tx, rx]);
  const handleClickSave = () => {
    const day = new Date();
    setKeep((prev) => [
      ...prev,
      {
        time: day.toLocaleString('ja-JP'),
        tx: tx,
        rx: rx,
        anser: anser,
        desc: descEl.current.value,
      },
    ]);
  };
  const handleClickDelete = (index) => {
    setKeep((prev) => {
      if (prev && prev.length === 0) return prev;
      return prev.filter((val, n) => {
        return n !== index;
      });
    });
  };
  useEffect(() => {
    if (location) {
      setQR(location.href);
    }
  }, []);
  return (
    <div className='continer'>
      <Head>
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='VSWR' />
        <title>ＶＳＷＲ計算ツール</title>
        <meta name='viewport' content='user-scalable=no' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0'
        />
        <link rel='icon' href='/VSWR.png' />
      </Head>
      <div className='py-4 bg-gray-300 shadow-md text-gray-800 text-4xl text-center font-bold'>
        <div>VSWR</div>
        <div className='absolute top-0 right-0 p-2 h-full'>
          <img
            className='mx-auto h-14'
            alt='qr-img'
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${qr}&size=80x80`}
          />
        </div>
      </div>
      <div className='container max-w-screen-sm mx-auto w-full pt-8 p-4'>
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
        <div>
          {keep &&
            keep.map((item, index) => {
              return (
                <div key={index} className='flex flex-row'>
                  <div className='flex flex-row'>
                    <div>
                      <button
                        className='my-auto p-3'
                        onClick={() => {
                          handleClickDelete(index);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className='text-gray-600'
                        />
                      </button>
                    </div>
                    <div className='flex flex-col'>
                      <div className='text-xs text-gray-500'>
                        <div>{item.time}</div>
                      </div>
                      <div className='flex flex-row space-x-2 pl-4'>
                        <div>進行波:{item.tx}W</div>
                        <div>反射波:{item.rx}W</div>
                        <div>VSWR値:{item.anser}</div>
                      </div>
                      <div className='pl-4'>
                        <div>{item.desc}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
