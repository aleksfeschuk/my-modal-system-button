import React, {  ReactNode, MouseEvent, useEffect, useRef }from "react";
import { createPortal } from "react-dom";
import "../App.css";


interface ModalProps  {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
} 


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {



    const modalRoot = document.getElementById("modal-root");
    const contentRef = useRef<HTMLDivElement>(null);


    useEffect (() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        if (isOpen && contentRef.current) {
            contentRef.current.focus();
        }
    }, [isOpen]);

        const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen || !modalRoot) return null;


    return createPortal (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>,
        modalRoot
    );
}


export default Modal;