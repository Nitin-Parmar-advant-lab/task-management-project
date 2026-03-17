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
            className="m-auto rounded-2xl shadow-2xl backdrop:bg-black/60 border-none overflow-hidden"
        >
            <div 
                className={`bg-white p-6 w-full ${modalWidth}`}
                
            >
                {children}
            </div>
        </dialog>,
        document.getElementById("modal-root"),
    );
}
