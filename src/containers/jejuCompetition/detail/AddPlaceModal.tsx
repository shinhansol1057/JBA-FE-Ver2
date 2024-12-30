import React, { useState } from "react";
import Modal from "react-modal";
import { PlaceType } from "@/types/competitionType";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import DaumPostcode, { Address } from "react-daum-postcode";
import PostInput from "@/components/common/PostInput";
import AddBtn from "@/components/common/AddBtn";
import confirmAlert from "@/libs/alert/ConfirmAlert";

type Props = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  places: PlaceType[];
  setPlaces: React.Dispatch<React.SetStateAction<PlaceType[]>>;
};
const AddPlaceModal = ({
  modalOpen,
  setModalOpen,
  places,
  setPlaces,
}: Props) => {
  const [placeName, setPlaceName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const getLALOInfo = async (address: string): Promise<void> => {
    const url =
      "https://dapi.kakao.com/v2/local/search/address.json?query=" +
      encodeURI(address);
    await axios
      .get(url, {
        headers: {
          Authorization: "KakaoAK " + process.env.NEXT_PUBLIC_KAKAO_API_KEY,
        },
      })
      .then((res) => {
        setLatitude(res.data.documents[0].y);
        setLongitude(res.data.documents[0].x);
      });
  };

  const registPlace = async () => {
    if (placeName === "") {
      await confirmAlert("error", "장소명을 입력해주세요.");
      return;
    } else if (address === "") {
      await confirmAlert("error", "주소를 검색해주세요.");
      return;
    }
    let place: PlaceType = {
      placeName: placeName,
      address: address,
      latitude: latitude,
      longitude: longitude,
    };
    setPlaces((prevState) => {
      return [...prevState, place];
    });
    setPlaceName("");
    setAddress("");
    setModalOpen(false);
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      ariaHideApp={false}
      style={customModalStyles}
      shouldCloseOnOverlayClick={true}
    >
      <div className={"flex flex-col items-center w-full"}>
        <div
          className={
            "text-[#EEEEEE] bg-[rgba(0,0,0,0.8)] flex justify-end items-center px-5 " +
            "h-10 sm:h-12 md:h-14 w-full"
          }
        >
          <IoClose
            className={
              "cursor-pointer text-[15px] sm:text-[20px] md:text-[30px]"
            }
            onClick={() => setModalOpen(false)}
          />
        </div>
        <div
          className={
            "flex justify-center items-center rounded-lg shadow-xl " +
            "bg-black text-white font-bold my-5 " +
            "text-sm sm:text-base md:text-lg " +
            "w-[90%] md:w-[800px] " +
            "h-10 sm:h-12 md:h-14 "
          }
        >
          {address === "" ? <p>주소 검색</p> : <p>{address}</p>}
        </div>
        <div className={"w-[90%] md:w-[800px]"}>
          <DaumPostcode
            onComplete={(data: Address): void => {
              const address: string =
                data.jibunAddress !== ""
                  ? data.jibunAddress
                  : data.autoJibunAddress;
              setAddress(address);
              getLALOInfo(address);
            }}
            autoClose={true}
          />
        </div>
        <div
          className={
            "flex justify-center items-center rounded-lg shadow-xl " +
            "bg-black text-white font-bold my-5 " +
            "w-[90%] md:w-[800px] " +
            "text-sm sm:text-base md:text-lg " +
            "h-10 sm:h-12 md:h-14 "
          }
        >
          <p>장소명</p>
        </div>
        <div className={"w-[90%] md:w-[800px]"}>
          <PostInput
            type={"text"}
            placeHolder={"예) 다목적체육관"}
            data={placeName}
            setData={setPlaceName}
          />
        </div>
        <div className={"mt-5 w-[90%] md:w-[800px]"}>
          <AddBtn handler={registPlace} />
        </div>
      </div>
    </Modal>
  );
};

export default AddPlaceModal;
const customModalStyles: ReactModal.Styles = {
  overlay: {
    width: "100%",
    height: "100vh",
    zIndex: "50",
    position: "fixed",
    top: 0,
    left: "0",
    backgroundColor: "#F5F5F5",
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
