import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="ja">
        <Head>
          <style>{`body { margin: 0 } /* custom!*/`}</style>
        </Head>
        <body className="custom_class w-full p-2 container mx-auto dark:bg-black bg-gray-200">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}