import '../../src/styles/globals.css'
import { Montserrat } from 'next/font/google'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'
import Script from 'next/script'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
})

export const metadata = {
  title: 'Vencent Domingo Portfolio',
  description: 'Portfolio website of Vencent Domingo',
  icons: {
    icon: [
      { url: '/images/favicon.ico' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/images/apple-touch-icon.png',
  },
  manifest: '/images/site.webmanifest',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Start of Tawk.to Script */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/68613b273111b119154e44cd/1iutsu58r';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
        {/* End of Tawk.to Script */}
      </head>
      <body className={`${montserrat.variable} font-sans bg-light dark:bg-dark dark:text-light w-full min-h-screen`}>
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`
          if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          `}
        </Script>
        <NavBar />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}
