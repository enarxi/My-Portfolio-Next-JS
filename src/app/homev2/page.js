import HomeV2Client from "@/components/homev2/HomeV2Client";

export const metadata = {
  title: "Vencent Domingo | Frontend Developer & SEO Specialist",
  description:
    "Portfolio of Vencent Domingo — Frontend Developer, SEO Specialist, WordPress Theme Developer, and Data Analyst. Crafting fast, accessible, and beautifully designed digital experiences.",
  keywords: [
    "Frontend Developer",
    "SEO Specialist",
    "WordPress Theme Developer",
    "Data Analyst",
    "Vencent Domingo",
    "Portfolio",
  ],
  openGraph: {
    title: "Vencent Domingo | Frontend Developer & SEO Specialist",
    description:
      "Crafting fast, accessible, and beautifully designed digital experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vencent Domingo | Frontend Developer & SEO Specialist",
    description:
      "Frontend Developer, SEO Specialist, WordPress Theme Developer & Data Analyst.",
  },
};

export default function HomeV2Page() {
  return <HomeV2Client />;
}
