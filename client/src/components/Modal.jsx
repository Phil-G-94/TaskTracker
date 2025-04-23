import { Children, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Backdrop = ({ isClosing, handleClose }) => {
    return (
        <div
            onClick={() => handleClose()}
            className={`fixed inset-0 z-[999] bg-black/75 transition-opacity duration-300 ${
                isClosing ? "opacity-0" : "opacity-100"
            }`}
        ></div>
    );
};

const ModalOverlay = ({ isClosing, children }) => {
    return (
        <section
            className={`fixed top-1/2 left-1/2 z-[1000] bg-white w-[90%] max-w-[500px] min-w-[25%] rounded-[14px] shadow-lg p-6 ${
                isClosing ? "animate-slide-up" : "animate-slide-down"
            }`}
        >
            <h3 className="text-2xl text-center">Edit Task</h3>
            {children}
        </section>
    );
};

export default function Modal({ children, closeEditModal }) {
    const portalElement = document.querySelector("#modal");

    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
    };

    useEffect(() => {
        if (isClosing) {
            const timer = setTimeout(() => {
                closeEditModal();
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [isClosing, closeEditModal]);

    return (
        <>
            {createPortal(<Backdrop isClosing={isClosing} handleClose={handleClose} />, portalElement)}
            {createPortal(<ModalOverlay isClosing={isClosing}>{children}</ModalOverlay>, portalElement)}
        </>
    );
}
