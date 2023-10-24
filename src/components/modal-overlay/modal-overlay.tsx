import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./modal-overlay.module.css";

interface ModalOverlayProps {
  children: ReactNode;
  onClose: () => void;
}

const modalRoot = document.getElementById("modal-root");

const ModalOverlay: FC<ModalOverlayProps> = ({ children, onClose }) => {
  document.addEventListener(
    "keydown",
    (event) => event.code === "Escape" && onClose()
  );
  return modalRoot
    ? ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onClose}>
          {children}
        </div>,
        modalRoot
      )
    : null;
};

export default ModalOverlay;
