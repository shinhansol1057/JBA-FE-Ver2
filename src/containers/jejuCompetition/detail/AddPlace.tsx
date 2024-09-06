import React, { useState } from "react";
import { placeType } from "@/types/CompetitionType";
import Modal from "react-modal";
import AddPlaceModal from "@/containers/jejuCompetition/detail/AddPlaceModal";
import { IoClose } from "react-icons/io5";

type Props = {
  places: placeType[];
  setPlaces: React.Dispatch<React.SetStateAction<placeType[]>>;
};
const AddPlace = ({ places, setPlaces }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const deletePlaceHandler = (i: number) => {
    setPlaces((prevState) => {
      return prevState.filter((_: placeType, index: number) => index !== i);
    });
  };

  return (
    <div
      className={
        "flex flex-col min-h-[70px] bg-white rounded-[8px] shadow-xl my-[20px] p-[10px] md:p-[20px]"
      }
    >
      <button
        className={
          "font-bold rounded-[8px] bg-black text-white p-[10px] text-[12px] sm:text-[14px] md:text-[18px] hover:bg-[#4B4B4B]"
        }
        onClick={() => setModalOpen(true)}
      >
        장소 찾기
      </button>
      <ul>
        {places?.map((place: placeType, i: number) => {
          return (
            <li
              key={i}
              className={
                "flex text-[12px] sm:text-[14px] md:text-[16px] m-[10px]"
              }
            >
              <p>- {place.placeName}</p>
              <IoClose
                className={"cursor-pointer "}
                onClick={() => deletePlaceHandler(i)}
              />
            </li>
          );
        })}
      </ul>
      <AddPlaceModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        places={places}
        setPlaces={setPlaces}
      />
    </div>
  );
};

export default AddPlace;
