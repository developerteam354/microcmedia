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
                lerp: 0.1, // Faster responsiveness (default is usually 0.1)
                smoothWheel: true,
                syncTouch: false, // Let native mobile momentum scroll work
                touchMultiplier: 1.0, // Native 1:1 speed
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
