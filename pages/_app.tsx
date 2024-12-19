import '@/styles/index.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=XXXXXXXXX`}
        />
        <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX', {
              page_path: window.location.pathname,
            });
          `,
            }}
        />
      <Component {...pageProps} />
        </>
  )
}
