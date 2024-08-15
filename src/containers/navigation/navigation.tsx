"use client";
import { IoMenu } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import MenuModal from "@/containers/navigation/MenuModal";
import styled, { keyframes } from "styled-components";

const Navigation = () => {
  const router = useRouter();
  const path = usePathname();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <nav
      className={
        "flex items-center justify-between px-5 h-[30px] sm:h-[50px] relative " +
        (path === "/" ? "bg-[rgba(212,212,212,0.4)]" : "bg-[rgba(0,0,0,0.3)]")
      }
    >
      <h1
        lang={"en"}
        className={"text-[lg] sm:text-2xl text-white cursor-pointer "}
        onClick={() => router.push("/")}
      >
        JBA
      </h1>
      <IoMenu
        color={"white"}
        className={"cursor-pointer text-2xl sm:text-4xl"}
        onClick={() => setModalOpen(true)}
      />
      <Modal
        ariaHideApp={false}
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customModalStyles}
        contentLabel="menu"
      >
        <MenuModal setModalOpen={setModalOpen} />
      </Modal>
    </nav>
  );
};

export default Navigation;

const customModalStyles: ReactModal.Styles = {
  overlay: {
    background: "none",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    height: "100vh",
    zIndex: "150",
    position: "absolute",
    bottom: "unset",
    left: "unset",
    top: "0",
    right: "0",
    borderRadius: "70px 0 0 70px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    display: "flex",
    overflow: "auto",
  },
};
