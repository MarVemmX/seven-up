import localFont from "next/font/local";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import "./app.css";
import Header from "@/components/Header";
import ViewCanvas from "@/components/ViewCanvas";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";

import type { Metadata } from "next";

const alpino = localFont({
  src: "../../public/fonts/Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino",
});

export const metadata: Metadata = {
  title: "Seven-Up Bottling Co. (SBC) — Pepsi, 7UP, Mountain Dew, Mirinda & Dr Pepper",
  description:
    "Experience the iconic 3D beverage showcase of Seven-Up Bottling Company (SBC), featuring Pepsi, 7UP, Mountain Dew, Mirinda, and Dr Pepper in interactive 3D.",
  openGraph: {
    title: "Seven-Up Bottling Co. — The 5 Beverage Giants",
    description:
      "Interactive 3D Beverage Showcase featuring Pepsi, 7UP, Mountain Dew, Mirinda, and Dr Pepper.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={alpino.variable}>
      <body className="overflow-x-hidden bg-[#008B44] text-white">
        <CustomCursor />
        <Preloader />
        <SmoothScroll>
          <Header />
          <main>
            {children}
            <ViewCanvas />
          </main>
          <Footer />
        </SmoothScroll>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
