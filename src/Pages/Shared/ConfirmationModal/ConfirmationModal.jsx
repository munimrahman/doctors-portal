import React from "react";

const ConfirmationModal = ({
  title,
  message,
  closeModal,
  modalData,
  successButtonText,
  confirmDelete,
}) => {
  return (
    <>
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label
              htmlFor="confirmation-modal"
              onClick={() => confirmDelete(modalData)}
              className="btn"
            >
              {successButtonText}
            </label>
            <button className="btn btn-outline" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
