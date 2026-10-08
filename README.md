# 🥤 Fizzi — Award-Winning 3D Craft Soda Experience

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r167-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-v8.17-black?style=for-the-badge&logo=react)](https://docs.pmnd.rs/react-three-fiber/)
[![GSAP](https://img.shields.io/badge/GSAP-v3.12-green?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Awwwards Ready](https://img.shields.io/badge/Awwwards-Site_of_the_Day_Ready-gold?style=for-the-badge)](https://www.awwwards.com/)

> An award-level 3D e-commerce landing page for **Fizzi Soda** built with Next.js 14, Three.js, React Three Fiber, GSAP ScrollTrigger, and Prismic CMS. Features dynamic WebGL interactive cursor parallax, fizzy soda particle physics, photorealistic Rayleigh atmosphere sky, smooth momentum scrolling, and a 5-flavor paginated craft specs card modal.

---

## ✨ Key Features

- **🎯 Interactive 3D Cursor Parallax**: Soda cans dynamically track and tilt toward mouse cursor movements with smooth lerp damp physics (`THREE.MathUtils.damp`).
- **💥 Fizzy Soda Burst Particle System**: Clicking any 3D soda can triggers a burst of 3D fizzy droplets and expanding shockwave rings matching the active flavor color.
- **⛅ Photorealistic Atmospheric Sky**: Physical 3D Rayleigh scattering atmosphere (`<Sky />`) with volumetric clouds and natural sunlit directional illumination.
- **📑 5-Flavor Paginated Can Specs Card Modal**: Interactive specs modal featuring full nutrition data, tasting notes, and stat bar fill animations across all 5 flavors (*Strawberry Lemonade, Black Cherry, Grape Goodness, Lemon Lime, Watermelon Crush*).
- **📜 Lenis Smooth Momentum Scroll**: Buttery-smooth momentum scrolling synchronized with GSAP ScrollTrigger timelines.
- **🥤 Animated Brand Preloader**: Full-screen brand preloader with pulsing Fizzi logo, rising carbonation bubbles, 0–100% asset load percentage counter, and curtain slide-up reveal.
- **🎯 Custom Magnetic Cursor**: Trailing magnetic ring cursor expanding over interactive 3D cans, logos, and buttons.
- **📱 100% Fully Responsive**: Responsive 3D view canvas scaling with static fallback images on mobile devices for guaranteed 60 FPS performance.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- **3D Graphics & Physics**: [Three.js](https://threejs.org/), [React Three Fiber (R3F)](https://docs.pmnd.rs/react-three-fiber/), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations**: [GSAP](https://greensock.com/gsap/) (ScrollTrigger, `@gsap/react`), [Lenis](https://lenis.darkroom.engineering/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/), Glassmorphism, Alpino Variable Font
- **Content Management**: [Prismic CMS](https://prismic.io/), Slice Machine

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/fizzi-soda-3d.git
   cd fizzi-soda-3d
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🎨 Flavor Lineup

| Flavor | Flavor Notes | Prebiotic Fiber | Sugar | Calories |
| :--- | :--- | :---: | :---: | :---: |
| 🍓 **Strawberry Lemonade** | Sun-ripened organic strawberries & Meyer lemons | 9g | 3g | 35 kcal |
| 🍒 **Black Cherry** | Rich wild dark cherry juice with a tart finish | 8g | 3g | 35 kcal |
| 🍇 **Grape Goodness** | Classic Concord grape elixir with prebiotic plants | 9g | 2g | 30 kcal |
| 🍋 **Lemon Lime** | Zesty sun-drenched lemons & punchy key lime | 10g | 2g | 25 kcal |
| 🍉 **Watermelon Crush** | Fresh summer watermelon with mineral fizz | 8g | 3g | 30 kcal |

---

## 🏆 Awwwards Submission Checklist

- [x] 0 TypeScript & Console Errors
- [x] Photorealistic 3D WebGL Atmosphere
- [x] Interactive Cursor Physics & Particle Burst
- [x] Lenis Smooth Momentum Scroll
- [x] 100% Responsive Viewport Architecture
- [x] OpenGraph Metadata & SEO Optimization

---

## 📄 License

Distributed under the Apache 2.0 License. See `LICENSE` for details.
