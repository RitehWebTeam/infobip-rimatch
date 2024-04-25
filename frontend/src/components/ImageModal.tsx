import Modal from "@mui/material/Modal";
import { useState } from "react";

interface ImageModalProps {
  image: string;
}

export default function ImageModal({ image }: ImageModalProps) {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className="flex justify-center">
          <img srcSet={image} />
        </div>
      </Modal>
    </div>
  );
}
