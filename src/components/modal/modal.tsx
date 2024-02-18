import { FC, useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

interface ModalProps {
  title?: string;
  children: ReactNode;
  closeModal: () => void;
}

const modalRoot = document.getElementById("modal-root");

const Modal: FC<ModalProps> = ({ title, children, closeModal }) => {
  useEffect(() => {
    const handleESCclose = (event: KeyboardEvent) => {
      event.code === "Escape" && closeModal();
    };
    document.addEventListener("keydown", handleESCclose);
    return () => document.removeEventListener("keydown", handleESCclose);
  }, [closeModal]);

  return modalRoot
    ? ReactDOM.createPortal(
        <>
          <div
            data-testid="modal"
            className={styles.modal}
            onClick={(event) => event.stopPropagation()}
          >
            {title && (
              <div className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
              </div>
            )}
            {children}
            <div className={styles.close_icon} data-testid="close-icon">
              <CloseIcon type="primary" onClick={closeModal} />
            </div>
          </div>
          <ModalOverlay onClose={closeModal} />
        </>,
        modalRoot
      )
    : null;
};

export default Modal;
