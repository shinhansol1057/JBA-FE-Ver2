import React from "react";
import {
  addCompetitionScheduleRowType,
  addCompetitionScheduleType,
  placeType,
} from "@/types/CompetitionType";
import AddRowBox from "@/containers/jejuCompetition/schedule/AddRowBox";
import { getDateAndTimeToString } from "@/utils/FormDate";

type Props = {
  divisionIndex: number;
  places: placeType[];
  addCompetitionScheduleList: addCompetitionScheduleType[];
  setAddCompetitionScheduleList: React.Dispatch<
    React.SetStateAction<addCompetitionScheduleType[]>
  >;
};
const AddDivisionBox = ({
  divisionIndex,
  places,
  addCompetitionScheduleList,
  setAddCompetitionScheduleList,
}: Props) => {
  let list: { place: string; rowList: addCompetitionScheduleRowType[] }[] = [];
  const setGameNumber = () => {
    list = [];
    for (let k: number = 0; k < places.length; k++) {
      list.push({ place: places[k].placeName, rowList: [] });
    }
    for (let i: number = 0; i < addCompetitionScheduleList.length; i++) {
      for (
        let j: number = 0;
        j < addCompetitionScheduleList[i].postCompetitionScheduleRow.length;
        j++
      ) {
        const data: addCompetitionScheduleRowType =
          addCompetitionScheduleList[i].postCompetitionScheduleRow[j];
        for (let e: number = 0; e < list.length; e++) {
          if (list[e].place === data.place) {
            list[e].rowList.push(data);
          }
        }
      }
    }

    for (let r: number = 0; r < addCompetitionScheduleList.length; r++) {
      for (
        let t: number = 0;
        t < addCompetitionScheduleList[r].postCompetitionScheduleRow.length;
        t++
      ) {
        let num: number = 1;
        const target: addCompetitionScheduleRowType =
          addCompetitionScheduleList[r].postCompetitionScheduleRow[t];
        for (let y: number = 0; y < list.length; y++) {
          if (target.place === list[y].place) {
            for (let u: number = 0; u < list[y].rowList.length; u++) {
              // @ts-ignore
              if (
                target.startDate &&
                list[y].rowList[u].startDate &&
                new Date(target.startDate)?.getTime() >
                  new Date(list[y].rowList[u].startDate).getTime()
              ) {
                num++;
              }
            }
          }
        }
        setAddCompetitionScheduleList((prevState) => {
          const scheduleList: addCompetitionScheduleType[] = [...prevState];
          scheduleList[r].postCompetitionScheduleRow[t].gameNumber = num;
          return scheduleList;
        });
      }
    }
  };

  const plusHandler = () => {
    let prevStartDate: number | undefined;
    let row =
      addCompetitionScheduleList[divisionIndex].postCompetitionScheduleRow;
    let firstLastDate;
    let secondLastDate;
    if (row.length > 1) {
      firstLastDate = row[row.length - 1].startDate ?? new Date();
      firstLastDate = new Date(firstLastDate).getTime();
      secondLastDate = row[row.length - 2].startDate ?? new Date();
      secondLastDate = new Date(secondLastDate).getTime();
      prevStartDate = 2 * firstLastDate - secondLastDate;
    } else if (row.length == 1) {
      firstLastDate = row[row.length - 1].startDate ?? new Date();
      firstLastDate = new Date(firstLastDate).getTime() + 3600000;
      prevStartDate = firstLastDate;
    } else {
      prevStartDate = new Date().getTime();
    }
    const initial: addCompetitionScheduleRowType = {
      gameNumber: 1,
      startDate: getDateAndTimeToString(
        new Date(prevStartDate ?? new Date().getTime()),
      ),
      floor: "",
      place: places[0].placeName,
      homeName: "",
      awayName: "",
      state5x5: true,
    };
    setAddCompetitionScheduleList((prevState) => {
      const scheduleList: addCompetitionScheduleType[] = [...prevState];
      scheduleList[divisionIndex].postCompetitionScheduleRow.push(initial);
      return scheduleList;
    });
    setGameNumber();
  };

  return (
    <div className={"mb-[30px] md:mb-[50px]"}>
      <div
        className={
          "flex justify-center items-center bg-amber-400 mb-[5px] rounded-[8px] " +
          "text-[12px] sm:text-[14px] md:text-[20px] " +
          "h-[30px] sm:h-[40px] md:h-[50px] "
        }
      >
        <p>{addCompetitionScheduleList[divisionIndex]?.division}</p>
      </div>
      {addCompetitionScheduleList[
        divisionIndex
      ]?.postCompetitionScheduleRow.map(
        (schedule: addCompetitionScheduleRowType, i: number) => {
          return (
            <AddRowBox
              key={"row" + i}
              divisionIndex={divisionIndex}
              rowIndex={i}
              places={places}
              addCompetitionScheduleList={addCompetitionScheduleList}
              setAddCompetitionScheduleList={setAddCompetitionScheduleList}
              setGameNumber={setGameNumber}
            />
          );
        },
      )}
      <button
        onClick={() => plusHandler()}
        className={"w-full h-[20px] rounded-[8px] bg-[#B5B5B5]"}
      >
        +
      </button>
    </div>
  );
};

export default AddDivisionBox;
