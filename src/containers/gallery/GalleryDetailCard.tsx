"use client";
import React, { useEffect, useState } from "react";
import { getGalleryDetailType } from "@/types/GalleryType";
import Image from "next/image";
import Modal from "react-modal";
import GalleryDetailModal from "@/containers/gallery/GalleryDetailModal";

type Props = {
  data: getGalleryDetailType;
};
const GalleryDetailCard = ({ data }: Props) => {
  console.log(data);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div
      className={
        "h-[180px] sm:h-[220px] md:h-[390px] " +
        "rounded-[8px] overflow-hidden cursor-pointer"
      }
    >
      <Image
        src={data.fileUrl}
        alt={data.fileName}
        width={300}
        height={300}
        className={"w-full h-full object-cover"}
        onClick={() => setModalOpen(true)}
      />
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
        style={customModalStyles}
        shouldCloseOnOverlayClick={true}
      >
        <GalleryDetailModal setModalOpen={setModalOpen} data={data} />
      </Modal>
    </div>
  );
};

export default GalleryDetailCard;
const customModalStyles: ReactModal.Styles = {
  overlay: {
    width: "100%",
    height: "100vh",
    zIndex: "50",
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
