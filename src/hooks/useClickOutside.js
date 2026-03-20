import { useEffect, useRef } from "react";

export function useClickOutside(handler, isPaused = false) {
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {

            if (isPaused) return;

            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handler, isPaused]);

    return ref;
}