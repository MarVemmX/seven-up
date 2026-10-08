import clsx from "clsx";

type Props = {
  className?: string;
};

export default function SbcSeal({ className }: Props) {
  return (
    <div
      className={clsx(
        "relative flex size-32 md:size-44 items-center justify-center select-none",
        className
      )}
    >
      {/* Outer Rotating Text */}
      <svg
        viewBox="0 0 200 200"
        className="size-full animate-spin-slow origin-center"
      >
        <path
          id="circlePath"
          d="M 100, 100 m -72, 0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
          fill="none"
        />
        <text className="text-[10px] font-black uppercase tracking-[0.22em] fill-current">
          <textPath href="#circlePath" startOffset="0%">
            SEVEN-UP BOTTLING CO. • PEPSI • 7UP • DEW • MIRINDA • DR PEPPER •
          </textPath>
        </text>
      </svg>

      {/* Center Shield / Star */}
      <div className="absolute inset-0 m-auto flex size-14 md:size-20 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl ring-2 ring-white/50">
        <span className="text-xl md:text-2xl font-black italic">7UP</span>
      </div>
    </div>
  );
}
