import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useLocalStorage } from '../src/hooks/useLocalStorage';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VSWRTool } from 'src/components/form/VSWRTool';

export default function IndexPage() {
  const [keep, setKeep] = useLocalStorage('keep', []);
  const [qr, setQR] = useState('');
  const handleClickSave = (item) => {
    setKeep((prev) => [...prev, item]);
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
          <a href={qr} target='_blank'>
            <img
              className='mx-auto h-14'
              alt='qr-img'
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${qr}&size=80x80`}
            />
          </a>
        </div>
      </div>
      <div className='container max-w-screen-sm mx-auto w-full pt-8 p-4'>
        <VSWRTool onClickSave={handleClickSave} />
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
