import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../confirmDeleteModalSlice";

const ConfirmDeleteModal = ({ message, confirm }) => {
  const dispatch = useDispatch();

  const showModal = useSelector((state) => state.confirmDeleteModal.showModal);

  return (
    <>
      <div
        id="popup-modal"
        tabIndex="-1"
        className={`${
          showModal ? "flex" : "hidden"
        } justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full`}
        aria-modal="true"
        role="dialog"
      >
        <div className="relative pt-2 px-4 w-full max-w-[18rem] sm:max-w-xs h-full md:h-auto">
          <div
            onClick={() => dispatch(setModal(false))}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          ></div>
          <div className="mx-auto relative bg-white rounded-sm shadow">
            <div className="p-6 text-start flex flex-col justify-between gap-4">
              <span className="text-xl font-semibold">Konfirmasi</span>
              <span className="flex flex-col gap-2 text-gray-500 text-sm">
                <p>{message}</p>
                <p className="font-semibold">Tetap akan menghapus?</p>
              </span>
              <div className="flex justify-between">
                <button
                  onClick={confirm}
                  data-modal-toggle="popup-modal"
                  type="button"
                  className="px-4 py-2 text-gray-500 font-medium rounded-xs hover:text-gray-900 focus:z-10"
                >
                  Hapus
                </button>
                <button
                  onClick={() => dispatch(setModal(false))}
                  data-modal-toggle="popup-modal"
                  type="button"
                  className="px-4 py-2 text-emerald-400 hover:text-emerald-500 hover:bg-gray-50 font-medium rounded-xs focus:z-10"
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDeleteModal;