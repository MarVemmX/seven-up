import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `BigText`.
 */
export type BigTextProps = SliceComponentProps<Content.BigTextSlice>;

/**
 * Component for "BigText" Slices.
 */
const BigText = ({ slice }: BigTextProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full max-w-full overflow-hidden bg-[#003B7A] py-16 sm:py-24 md:py-32 text-[#FEE832] flex items-center justify-center border-t-2 border-white/20"
    >
      {/* Subtle radial spotlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,transparent_70%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="grid w-full gap-4 sm:gap-6 md:gap-8 font-black uppercase">
          {/* Top Line */}
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tighter drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] leading-tight">
            7UP BOTTLING
          </div>

          {/* Middle Line - 5 Powerhouse Brands */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base font-black tracking-wider uppercase">
            <span className="border-2 border-sky-400/60 bg-sky-950/80 px-3.5 py-1.5 text-sky-300 shadow-md">
              PEPSI
            </span>
            <span className="hidden text-white/40 sm:inline">•</span>
            <span className="border-2 border-emerald-400/60 bg-emerald-950/80 px-3.5 py-1.5 text-emerald-300 shadow-md">
              7UP
            </span>
            <span className="hidden text-white/40 sm:inline">•</span>
            <span className="border-2 border-lime-400/60 bg-lime-950/80 px-3.5 py-1.5 text-lime-300 shadow-md">
              MTN DEW
            </span>
            <span className="hidden text-white/40 sm:inline">•</span>
            <span className="border-2 border-orange-400/60 bg-orange-950/80 px-3.5 py-1.5 text-orange-400 shadow-md">
              MIRINDA
            </span>
            <span className="hidden text-white/40 sm:inline">•</span>
            <span className="border-2 border-rose-400/60 bg-rose-950/80 px-3.5 py-1.5 text-rose-300 shadow-md">
              DR PEPPER
            </span>
          </div>

          {/* Bottom Line */}
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-[#E31837] tracking-tighter drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] leading-tight">
            REFRESHMENT
          </div>
        </h2>
      </div>
    </section>
  );
};

export default BigText;
