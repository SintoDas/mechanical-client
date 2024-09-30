import { Modal, Button } from "flowbite-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  productName,
}: ConfirmationModalProps) {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Confirm Delete</Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete <strong>{productName}</strong>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button color="failure" onClick={onConfirm}>
          Yes, Delete
        </Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
