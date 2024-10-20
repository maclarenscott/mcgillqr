import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { augmentDocumentWithEmotionCache } from './_app';

class RootDocument extends Document {
    static async getInitialProps(ctx:DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }
    render() {
        return (
            <Html lang="en">
              <Head key="document">
                  <link rel="preconnect" href="https://fonts.googleapis.com" />
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                  { /* eslint-disable */  }
                  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
              </Head>
              <body className="dark">
                <Main />
                <NextScript />
              </body>
            </Html>
        )
    }
}

augmentDocumentWithEmotionCache(RootDocument);

export default RootDocument;