import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang='ja'>
        <Head>
          <style>{`body { margin: 0 } /* custom!*/`}</style>
          <link rel='manifest' href='/manifest.webmanifest' />
          <link rel='apple-touch-icon' href='VSWR.png' />
        </Head>
        <body className='custom_class w-full bg-gray-200'>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
