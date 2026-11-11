import { useState } from "react";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";

export default function ButtonCall({
  className = "",
  text = "Book a call",
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className={className} onClick={() => setOpen(true)}>
       { text}
      </Button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <h2>Reservá tu llamada</h2>
        </Modal>
      )}
    </>
  );
}