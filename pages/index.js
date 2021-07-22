import Link from 'next/link'
import Head from 'next/head'
import { Slider } from '../src/components/Slider';

export default function IndexPage() {
  return (
    <div>
      <Head>
        <link rel="apple-touch-icon" href="VS.png" />
        <meta name="apple-mobile-web-app-title" content="VSWR" />
        <link rel='icon' href='/VS.png' />
        <title>ＶＳＷＲ計算ツール</title>
      </Head>
      <Slider />
      <Slider />
      <label for="slider">反射波(W):</label>
      <input type="range" name="slider" id="slider2" value="0" min="0" max="4" step="0.1" data-highlight="true" />
      <div id="val" className="text-4xl"></div>
    </div>
  )
}
