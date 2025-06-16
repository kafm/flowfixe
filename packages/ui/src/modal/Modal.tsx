import React, { useEffect, useCallback } from "react";


export interface ModalProps {
  title?: string;
  open?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  backdrop?: "transparent" | "opaque" | "blur";
  enableHeader?: boolean;
  enableCloseButtonInHeader?: boolean;
  enableBackdropClose?: boolean;
  enableKeyboardClose?: boolean;
  expandOnMobile?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export const Modal = ({
  title,
  open = false,
  backdrop = "opaque",
  size = "md",
  enableHeader = true,
  enableCloseButtonInHeader = true,
  enableKeyboardClose = true,
  enableBackdropClose = true,
  expandOnMobile,
  onClose,
  children,
}: ModalProps) => {
  const escCallback = useCallback(() => onClose && onClose(), [onClose]);
  const subscribeToEsc = () => window.addEventListener("keydown", escCallback);
  const unsubscribeToEsc = () =>
    window.removeEventListener("keydown", escCallback);
  const handleBackdropClick = (target: HTMLElement) =>
    target.classList.contains("ff-modal") &&
    enableBackdropClose &&
    onClose &&
    onClose();
  useEffect(() => {
    let listenToEsc = open && enableKeyboardClose && onClose;
    listenToEsc ? subscribeToEsc() : unsubscribeToEsc();
    return () => {
      listenToEsc && unsubscribeToEsc();
    };
  }, [open, enableKeyboardClose]);

  return (
    <dialog
      open={open}
      className={`ff-modal ${
        expandOnMobile ? "ff-mobile-expand " : ""
      }ff-backdrop-${backdrop}`}
      onClick={(e) => handleBackdropClick(e.target as HTMLElement)}
    >
      <article className={`ff-${size}`}>
        {enableHeader && (
          <header>
            <strong>{title}</strong>
            {enableCloseButtonInHeader && (
              <div>
                <a
                  aria-label="close"
                  onClick={onClose}
                ></a>
              </div>
            )}
          </header>
        )}
        {children}
      </article>
    </dialog>
  );
};
