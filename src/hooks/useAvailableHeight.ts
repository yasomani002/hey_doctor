import { useEffect, useState, type RefObject } from "react";

interface UseAvailableHeightOptions {
    minHeight?: number;
    bottomPadding?: number;
    bottomRefs?: RefObject<HTMLElement | null>[]; // ✅ multiple bottom elements
    debounce?: number; // optional debounce (ms)
}

export function useAvailableHeight(
    containerRef?: RefObject<HTMLElement | null>,
    options?: UseAvailableHeightOptions
) {
    const getViewportHeight = () =>
        window.visualViewport?.height ?? window.innerHeight;

    const minHeight = options?.minHeight ?? 0;
    const bottomPadding = options?.bottomPadding ?? 0;
    const bottomRefs = options?.bottomRefs ?? [];
    const debounceTime = options?.debounce ?? 0;

    const [height, setHeight] = useState(() => {
        if (typeof window === "undefined") return minHeight;
        return Math.max(minHeight, getViewportHeight());
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        let timeout: number | null = null;

        const calculate = () => {
            if (!containerRef?.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const viewportHeight = getViewportHeight();

            const bottomHeight = bottomRefs.reduce((acc, ref) => {
                return (
                    acc +
                    (ref.current?.getBoundingClientRect().height || 0)
                );
            }, 0);

            const available = Math.max(
                minHeight,
                viewportHeight - rect.top - bottomHeight - bottomPadding
            );

            setHeight((prev) => (prev !== available ? available : prev));
        };

        const recalc = () => {
            if (debounceTime > 0) {
                if (timeout) window.clearTimeout(timeout);
                timeout = window.setTimeout(calculate, debounceTime);
            } else {
                calculate();
            }
        };

        // Initial calculation
        const raf = requestAnimationFrame(recalc);

        // Events
        window.addEventListener("resize", recalc);
        window.visualViewport?.addEventListener("resize", recalc);

        // Optional: observe layout changes (VERY useful)
        const observer = new ResizeObserver(recalc);

        if (containerRef?.current) {
            observer.observe(containerRef.current);
        }

        bottomRefs.forEach((ref) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", recalc);
            window.visualViewport?.removeEventListener("resize", recalc);

            observer.disconnect();

            if (timeout) window.clearTimeout(timeout);
        };
    }, [containerRef, bottomRefs, minHeight, bottomPadding, debounceTime]);

    return height;
}