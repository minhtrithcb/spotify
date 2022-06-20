import { useEffect, useRef } from "react";

export default function useResize(size, cb) {
    const screenSize = useRef();

    useEffect(() => {
        screenSize.current = window.addEventListener("resize", () => {
            window.innerWidth >= size ? cb(true) : cb(false);
        });

        return () => {
            window.removeEventListener("resize", screenSize.current);
        };
    }, [size, cb]);
    return;
}
