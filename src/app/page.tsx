import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { sbcSlices } from "@/data/sbcData";
import AlikaHistory from "@/components/AlikaHistory";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "7UP — Pepsi, 7UP, Mountain Dew, Mirinda & Dr Pepper",
    description:
      "Experience the iconic 3D beverage showcase featuring Pepsi, 7UP, Mountain Dew, Mirinda, and Dr Pepper with interactive 3D cans and the historic Alika legacy.",
    openGraph: {
      title: "7UP — The Iconic Lineup",
      description:
        "Interactive 3D Beverage Showcase featuring Pepsi, 7UP, Mountain Dew, Mirinda, and Dr Pepper.",
      images: [{ url: "/labels/pepsi.jpg" }],
    },
  };
}

export default async function Index() {
  const heroSlice = [sbcSlices[0]];
  const restSlices = sbcSlices.slice(1);

  return (
    <>
      <SliceZone slices={heroSlice} components={components} />
      <AlikaHistory />
      <SliceZone slices={restSlices} components={components} />
    </>
  );
}
