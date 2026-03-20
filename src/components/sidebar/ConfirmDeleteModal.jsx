import Modal from "../ui/Modal";

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} modalWidth="w-[95%] max-w-sm">
            <div className="text-center p-1">
                <h3 className="text-xl font-bold mb-4 text-[#1D1D1F] dark:text-[#F5F5F7]">
                    Confirm Deletion
                </h3>
                <p className="text-[#86868B] dark:text-[#A1A1A6] mb-6 font-medium">
                    Are you sure? <br />
                    All tasks in this project will be removed.
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-xl hover:bg-[#E8E8ED] dark:hover:bg-[#2D2D2F] transition-all font-semibold shadow-sm active:scale-95 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2.5 bg-[#D70015] dark:bg-[#FF453A] text-white rounded-xl hover:bg-[#D70015] dark:hover:bg-[#FF453A] transition-all font-bold shadow-lg active:scale-95 cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
}
