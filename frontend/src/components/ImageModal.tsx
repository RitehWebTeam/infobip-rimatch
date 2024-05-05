import Modal from "@mui/material/Modal";

interface ImageModalProps {
  image: string;
  handleClose: () => void;
}

export default function ImageModal({ image, handleClose }: ImageModalProps) {
  const closeImage = () => handleClose();

  return (
    <Modal
      open={true}
      onClose={closeImage}
      className="flex justify-items-center align-items-center h-fill w-fill p-10"
    >
      <img
        src={image}
        className="object-contain h-fit sm:h-full relative -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2"
      />
    </Modal>
  );
}
