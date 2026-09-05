import "../../src/styles/globals.css";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import PageTransition from "@/components/common/PageTransition";

export const metadata = {
  title: "Vencent Domingo Portfolio",
  description: "Portfolio website of Vencent Domingo",
  icons: {
    icon: [
      { url: "/images/favicon.ico" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/images/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/images/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/images/apple-touch-icon.png",
  },
  manifest: "/images/site.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap"
        />

      </head>
      <body suppressHydrationWarning className="font-sans bg-bg text-fg w-full min-h-screen">
        <NavBar />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
