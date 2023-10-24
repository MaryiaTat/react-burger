import { FC, ReactNode } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

interface ModalProps {
  title?: string;
  children: ReactNode;
  closeModal: () => void;
}

const Modal: FC<ModalProps> = ({ title, children, closeModal }) => (
  <ModalOverlay onClose={closeModal}>
    <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.close_icon}>
          <CloseIcon type="primary" onClick={closeModal} />
        </div>
      </div>
      {children}
    </div>
  </ModalOverlay>
);

export default Modal;
