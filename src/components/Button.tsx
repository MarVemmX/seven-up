import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

type Props = {
  buttonLink: LinkField;
  buttonText: string | null;
  className?: string;
};

export default function Button({ buttonLink, buttonText, className }: Props) {
  return (
    <PrismicNextLink
      className={clsx(
        "border-2 border-white bg-emerald-700 px-8 py-4 text-center text-lg md:text-xl font-black uppercase tracking-widest text-white shadow-2xl transition-all duration-200 hover:bg-white hover:text-emerald-950 active:scale-95",
        className,
      )}
      field={buttonLink}
    >
      {buttonText}
    </PrismicNextLink>
  );
}
