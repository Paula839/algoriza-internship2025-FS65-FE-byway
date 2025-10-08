import { FiX, FiTrash2 } from "react-icons/fi";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
  message?: string;
}

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  name,
  message,
}: DeleteConfirmModalProps) => {
  if (!isOpen) return null;

const displayMessage = message ?? `Are you sure you want to delete this ${name}?`;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-[447px] h-[322px] rounded-2xl shadow-lg p-6 flex flex-col gap-3.5">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FiX className="w-6 h-6" />
        </button>

        <div className="flex items-center justify-center w-full mt-4">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <FiTrash2 className="text-red-600 w-10 h-10" />
          </div>
        </div>

        <h2 className="text-center text-lg font-medium text-gray-700 mt-4">
          {displayMessage}
        </h2>
        <p className="text-center text-sm text-gray-500">
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4 mt-auto">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
