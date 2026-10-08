import { SVGProps } from "react";
import clsx from "clsx";

export function SbcLogo({
  className,
  variant = "full",
  ...props
}: SVGProps<SVGSVGElement> & { variant?: "full" | "icon" }) {
  if (variant === "icon") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="none"
        className={clsx("size-10", className)}
        {...props}
      >
        <circle cx="50" cy="50" r="48" fill="#008B44" stroke="#ffffff" strokeWidth="4" />
        <text
          x="38"
          y="68"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="52"
          fill="#ffffff"
          fontStyle="italic"
        >
          7
        </text>
        <circle cx="70" cy="46" r="14" fill="#ED1B24" stroke="#ffffff" strokeWidth="2.5" />
        <text
          x="62"
          y="50"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fontSize="11"
          fill="#ffffff"
        >
          UP
        </text>
      </svg>
    );
  }

  return (
    <div className={clsx("inline-flex items-center gap-3 select-none", className)}>
      {/* 7UP Shield / Badge Icon */}
      <div className="relative flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 p-2 shadow-lg shadow-emerald-950/30 ring-2 ring-white/30 transition-transform duration-300 hover:scale-105 md:size-14">
        <span className="text-2xl font-black italic tracking-tighter text-white drop-shadow-sm md:text-3xl">
          7
        </span>
        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-600 text-[9px] font-black tracking-tighter text-white ring-2 ring-white shadow-sm md:size-6 md:text-[10px]">
          UP
        </span>
      </div>

      {/* Corporate Brand Typography */}
      <div className="flex flex-col leading-none text-left">
        <div className="flex items-center gap-1.5">
          <span className="text-lg font-black tracking-tight text-white drop-shadow md:text-2xl">
            SEVEN-UP
          </span>
          <span className="rounded-md bg-red-600 px-1.5 py-0.5 text-[10px] font-black tracking-widest text-white uppercase shadow-sm">
            SBC
          </span>
        </div>
        <span className="mt-0.5 text-[10px] font-extrabold tracking-[0.28em] text-emerald-300 uppercase md:text-xs">
          BOTTLING COMPANY
        </span>
      </div>
    </div>
  );
}

export default SbcLogo;
