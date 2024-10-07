"use client"
import styled, { css, keyframes } from "styled-components"
import Modal from "react-modal"
import MenuModal from "@/containers/navigation/MenuModal"
import { IoMenu } from "react-icons/io5"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

const Navigation = () => {
  const router = useRouter()
  const path = usePathname()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [isClosing, setIsClosing] = useState<boolean>(false)

  const closeModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setModalOpen(false)
      setIsClosing(false)
    }, 500) // Match the duration of the closing animation
  }

  if (path.startsWith("/admin")) {
    return null
  }
  return (
    <nav
      className={
        "flex items-center justify-between px-4 md:px-6 h-[50px] sm:h-[70px] relative z-10 " +
        (path === "/" ? "bg-[rgba(212,212,212,0.4)]" : "bg-[rgba(0,0,0,0.3)]")
      }
    >
      <h1
        lang={"en"}
        className={"text-2xl md:text-4xl text-white cursor-pointer "}
        onClick={() => router.push("/")}
      >
        JBA
      </h1>
      <IoMenu
        color={"white"}
        className={"cursor-pointer text-4xl md:text-6xl"}
        onClick={() => setModalOpen(true)}
      />
      <StyledModal
        ariaHideApp={false}
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel='menu'
        style={customModalStyles}
        isClosing={isClosing}
      >
        <MenuModal setModalOpen={setModalOpen} closeModal={closeModal} />
      </StyledModal>
    </nav>
  )
}

export default Navigation

const rightSlideIn = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`

const rightSlideOut = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`

const StyledModal = styled(Modal)<{ isClosing: boolean }>`
  &.ReactModal__Content {
    animation: ${({ isClosing }) =>
      isClosing
        ? css`
            ${rightSlideOut} 0.5s ease-in-out
          `
        : css`
            ${rightSlideIn} 0.5s ease-in-out
          `};
  }

  @media (max-width: 640px) {
    &.ReactModal__Content {
      width: 100%;
    }
  }

  @media (min-width: 641px) {
    &.ReactModal__Content {
      width: 500px;
    }
  }
`

const customModalStyles: ReactModal.Styles = {
  overlay: {
    background: "none",
    width: "100%",
    height: "100vh",
    zIndex: "50",
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
    paddingTop: "2rem",
    paddingRight: "2rem",
    backgroundColor: "white",
    display: "flex",
    overflow: "auto",
  },
}
