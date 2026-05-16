"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

declare global {
    interface Window {
        __lenis?: Lenis;
    }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        let rafId: number;
        let lenisInstance: Lenis | undefined;

        import("lenis").then(({ default: Lenis }) => {
            const lenis = new Lenis({
                lerp: 0.06, // Highly fluid floaty scroll
                smoothWheel: true,
                syncTouch: true,
                touchMultiplier: 1.5,
            });

            lenisInstance = lenis;
            window.__lenis = lenis;

            function raf(time: number) {
                lenis.raf(time);
                rafId = requestAnimationFrame(raf);
            }

            rafId = requestAnimationFrame(raf);
        });

        return () => {
            cancelAnimationFrame(rafId);
            lenisInstance?.destroy();
        };
    }, []);

    return <>{children}</>;
}
