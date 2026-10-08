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
      className="min-h-screen w-screen overflow-hidden bg-[#004B93] text-[#FEE832] flex items-center justify-center py-20"
    >
      <h2 className="grid w-full gap-[2vw] text-center font-black uppercase leading-[.8] tracking-tighter">
        <div className="text-[22vw] md:text-[17vw] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          7UP BOTTLING
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-[2.5vw] text-[10vw] md:text-[6vw] font-extrabold tracking-normal">
          <span className="text-sky-300 drop-shadow">PEPSI</span>
          <span className="text-white/60">•</span>
          <span className="text-emerald-300 drop-shadow">7UP</span>
          <span className="text-white/60">•</span>
          <span className="text-lime-300 drop-shadow">MTN DEW</span>
          <span className="text-white/60">•</span>
          <span className="text-orange-400 drop-shadow">MIRINDA</span>
          <span className="text-white/60">•</span>
          <span className="text-rose-300 drop-shadow">DR PEPPER</span>
        </div>
        <div className="text-[22vw] md:text-[17vw] text-[#E31837] drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          REFRESHMENT
        </div>
      </h2>
    </section>
  );
};

export default BigText;
