"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useProgress } from "@react-three/drei";

export default function Preloader() {
  const { progress: r3fProgress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Drive progress naturally through real asset loading percentages (1, 2, 3... 25... 65... 79... 100%)
  useEffect(() => {
    const targetProgress = Math.max(1, Math.round(r3fProgress));

    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev < targetProgress) {
          const step = Math.ceil((targetProgress - prev) * 0.25);
          return Math.min(prev + Math.max(1, step), targetProgress);
        } else if (prev < 100 && r3fProgress >= 100) {
          return prev + 1;
        }
        return prev;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [r3fProgress]);

  // Baseline progression step to ensure steady continuous counting
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        return 100;
      });
    }, 25);

    return () => clearInterval(timer);
  }, []);

  // When counter hits 100%, trigger curtain wipe reveal
  useEffect(() => {
    if (displayProgress >= 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoaded(true);
        },
      });

      tl.to(contentRef.current, {
        opacity: 0,
        y: -25,
        scale: 0.96,
        duration: 0.4,
        ease: "power2.inOut",
      }).to(
        preloaderRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "-=0.15"
      );
    }
  }, [displayProgress]);

  if (isLoaded) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#006838] text-white"
    >
      {/* Animated Carbonation Bubbles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/25 backdrop-blur-xs animate-float-up"
            style={{
              width: `${(i % 5) * 4 + 8}px`,
              height: `${(i % 5) * 4 + 8}px`,
              left: `${(i * 7 + 5) % 100}%`,
              bottom: "-40px",
              animationDuration: `${(i % 3) + 2.5}s`,
              animationDelay: `${(i % 4) * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Main Preloader Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center px-4 text-center"
      >
        {/* Real 7UP Logo */}
        <div className="relative mb-6 h-24 w-52 md:h-32 md:w-64">
          <Image
            src="/logo.png"
            alt="7UP"
            fill
            priority
            className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* Loading Taglines */}
        <p className="mb-2 text-xs font-black tracking-[0.3em] uppercase text-yellow-300 md:text-sm">
          Bottling Greatness Since 1960
        </p>
        <p className="mb-6 text-[11px] font-bold tracking-[0.2em] uppercase text-white/80 md:text-xs">
          Pepsi • 7UP • Mountain Dew • Mirinda • Dr Pepper
        </p>

        {/* Sharp Progress Bar Container */}
        <div className="relative h-3 w-64 overflow-hidden border-2 border-white bg-black/40 p-0.5 md:w-80">
          <div
            className="h-full bg-yellow-300 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(253,224,71,0.9)]"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <span className="mt-4 text-2xl font-black tracking-tight text-white md:text-3xl">
          {displayProgress}%
        </span>
      </div>

      <style jsx global>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-105vh) scale(1.2);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: float-up linear infinite;
        }
      `}</style>
    </div>
  );
}
