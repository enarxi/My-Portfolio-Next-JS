"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import Background from "./Background";

// Routes where the root NavBar/Footer/Background should be hidden
const ISOLATED_ROUTES = ["/homev2"];

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();
  const isIsolated = ISOLATED_ROUTES.some((route) => pathname.startsWith(route));

  if (isIsolated) {
    // Return children directly with no chrome
    return <>{children}</>;
  }

  return (
    <>
      <Background />
      <NavBar />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}
