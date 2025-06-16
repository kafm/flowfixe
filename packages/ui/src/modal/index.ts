import { Modal as _Modal, type ModalProps } from "./Modal";
import { ModalFooter, type ModalFooterProps } from "./ModalFooter";

type ModalCollection = typeof _Modal & {
    Footer: typeof ModalFooter;
  };
  
const Modal = _Modal as ModalCollection;  
Modal.Footer = ModalFooter;

export {
    type ModalProps,
    type ModalFooterProps
  };
  
export default Modal;