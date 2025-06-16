import React from "react";

export interface ModalFooterProps {
  children: React.ReactNode;
}

export const ModalFooter = ({
  children,
}: ModalFooterProps) => {
  return (
   <footer className="ff-modal-footer">{children}</footer>
  );
};
