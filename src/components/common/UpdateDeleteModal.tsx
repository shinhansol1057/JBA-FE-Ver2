import React from "react";
import ReactModal from "react-modal";

type Props = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteHandler: any;
  updateHandler: any;
};
const UpdateDeleteModal = ({
  modalOpen,
  setModalOpen,
  deleteHandler,
  updateHandler,
}: Props) => {
  const customModalStyles: ReactModal.Styles = {
    overlay: {
      width: "100%",
      height: "100vh",
      zIndex: "100",
      position: "fixed",
      top: 0,
      left: "0",
      backgroundColor: "rgba(0,0,0,0.8)",
    },
    content: {
      width: "100%",
      height: "100vh",
      zIndex: "150",
      position: "absolute",
      top: "0",
      left: "0",
      background: "none",
      justifyContent: "center",
      overflow: "auto",
      padding: "0",
    },
  };
  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      ariaHideApp={false}
      style={customModalStyles}
      shouldCloseOnOverlayClick={true}
    >
      <div className={"w-full h-full flex flex-col justify-end items-center"}>
        <div
          className={"w-full h-full"}
          onClick={() => setModalOpen(false)}
        ></div>
        <div
          className={
            "flex flex-col text-sm sm:text-base md:text-xl w-[90%] md:w-[600px] "
          }
        >
          <button
            className={
              "h-12 sm:h-16 md:h-24 " +
              "bg-[#D9D9D9] rounded-t-xl border border-solid border-[#B5B5B5] hover:bg-[#B5B5B5]"
            }
            onClick={updateHandler}
          >
            수정
          </button>
          <button
            className={
              "h-12 sm:h-16 md:h-24 " +
              "bg-[#D9D9D9] rounded-b-xl text-[#DF1A1A] hover:bg-[#B5B5B5]"
            }
            onClick={deleteHandler}
          >
            삭제
          </button>
          <button
            className={
              "h-12 sm:h-16 md:h-24 " +
              "bg-[#D9D9D9] rounded-xl my-5 hover:bg-[#B5B5B5]"
            }
            onClick={() => setModalOpen(false)}
          >
            취소
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default UpdateDeleteModal;
