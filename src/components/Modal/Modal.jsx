import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');


export const Modal = ({ onClose, children }) => {


    useEffect(() => {
        const handleEscClick = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscClick);

        return () => {
            window.removeEventListener('keydown', handleEscClick);
        }
    }, [onClose]);


    const handleModalBack = e => {
        if (e.target === e.currentTarget) {
            onClose();
        };
    };

    return createPortal(
        <div className="Overlay" onClick={handleModalBack}>
            <div className="Modal">{children}</div>
        </div>,
        modalRoot
    );


};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default Modal;