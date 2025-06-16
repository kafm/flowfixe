import { useState } from "react";
import { Modal } from "./Modal";
import { ModalFooter } from "./ModalFooter";
import { Button } from "../button";

export const ModalMainExample = (props: any) => {
  const { size, label, title, contents, backdrop} = props
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(!open)} label={label} />
      <Modal open={open} title={title} onClose={() => setOpen(false)} size={size} backdrop={backdrop}>
        {contents}
        <ModalFooter>
          <Button
            skin="primary"
            variant="outline"
            label="Close"
            onClick={() => setOpen(false)}
          ></Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
