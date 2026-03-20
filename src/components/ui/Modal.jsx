import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, children, modalWidth }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (isOpen && dialog) {
            dialog.showModal();
        } else if (!isOpen && dialog) {
            dialog.close();
        }
    }, [isOpen]);

    return createPortal(
        <dialog
            ref={dialogRef}
            onClose={onClose}
            className={`m-auto rounded-3xl shadow-2xl backdrop:bg-black/40 border-none overflow-hidden backdrop:backdrop-blur-sm outline-none ${modalWidth}`}
        >
            <div className={`bg-[#FFFFFF] dark:bg-[#161617] p-6 md:p-8 w-full`}>
                {children}
            </div>
        </dialog>,
        document.getElementById("modal-root"),
    );
}