import React, { useState } from "react";
import { PlaceType } from "@/types/competitionType";
import Modal from "react-modal";
import AddPlaceModal from "@/containers/jejuCompetition/detail/AddPlaceModal";
import { IoClose } from "react-icons/io5";

type Props = {
  places: PlaceType[];
  setPlaces: React.Dispatch<React.SetStateAction<PlaceType[]>>;
};
const AddPlace = ({ places, setPlaces }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const deletePlaceHandler = (i: number) => {
    setPlaces((prevState) => {
      return prevState.filter((_: PlaceType, index: number) => index !== i);
    });
  };

  return (
    <div
      className={
        "flex flex-col min-h-28 bg-white rounded-lg shadow-xl my-5 p-2.5 md:p-5"
      }
    >
      <button
        className={
          "font-bold rounded-lg bg-black text-white p-2.5 " +
          "text-sm sm:text-base md:text-lg hover:bg-[#4B4B4B]"
        }
        onClick={() => setModalOpen(true)}
      >
        장소 찾기
      </button>
      <ul>
        {places?.map((place: PlaceType, i: number) => {
          return (
            <li
              key={i}
              className={"flex text-sm sm:text-base md:text-lg m-2.5"}
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
