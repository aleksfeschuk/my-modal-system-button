import React, {  ReactNode, MouseEvent, useEffect, useRef }from "react";
import { createPortal } from "react-dom";



interface ModalProps  {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
} 


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            modalRef.current?.focus();
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };

    }, [isOpen, onClose]);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content" ref={modalRef} tabIndex={-1}>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root")!
    );
};

export default Modal;

   