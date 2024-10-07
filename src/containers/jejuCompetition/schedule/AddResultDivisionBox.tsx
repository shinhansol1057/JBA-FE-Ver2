import React from "react";
import {
  addCompetitionResultRowType,
  addCompetitionResultType,
  addCompetitionScheduleRowType,
  placeType,
} from "@/types/CompetitionType";
import { getDateAndTimeToString } from "@/utils/FormDate";
import AddScheduleRowBox from "@/containers/jejuCompetition/schedule/AddScheduleRowBox";
import AddResultRowBox from "@/containers/jejuCompetition/schedule/AddResultRowBox";

type Props = {
  divisionIndex: number;
  places: placeType[];
  addCompetitionResultList: addCompetitionResultType[];
  setAddCompetitionResultList: React.Dispatch<
    React.SetStateAction<addCompetitionResultType[]>
  >;
};
const AddResultDivisionBox = ({
  divisionIndex,
  places,
  addCompetitionResultList,
  setAddCompetitionResultList,
}: Props) => {
  let list: { place: string; rowList: addCompetitionResultRowType[] }[] = [];
  const setGameNumber = () => {
    list = [];
    for (let k: number = 0; k < places.length; k++) {
      list.push({ place: places[k].placeName, rowList: [] });
    }
    for (let i: number = 0; i < addCompetitionResultList.length; i++) {
      for (
        let j: number = 0;
        j < addCompetitionResultList[i].postResultRequestRows.length;
        j++
      ) {
        const data: addCompetitionResultRowType =
          addCompetitionResultList[i].postResultRequestRows[j];
        for (let e: number = 0; e < list.length; e++) {
          if (list[e].place === data.place) {
            list[e].rowList.push(data);
          }
        }
      }
    }

    for (let r: number = 0; r < addCompetitionResultList.length; r++) {
      for (
        let t: number = 0;
        t < addCompetitionResultList[r].postResultRequestRows.length;
        t++
      ) {
        let num: number = 1;
        const target: addCompetitionResultRowType =
          addCompetitionResultList[r].postResultRequestRows[t];
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
        setAddCompetitionResultList((prevState) => {
          const resultList: addCompetitionResultType[] = [...prevState];
          resultList[r].postResultRequestRows[t].gameNumber = num;
          return resultList;
        });
      }
    }
  };

  const plusHandler = () => {
    let prevStartDate: number | undefined;
    let row = addCompetitionResultList[divisionIndex].postResultRequestRows;
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
    const initial: addCompetitionResultRowType = {
      competitionResultId: null,
      gameNumber: 1,
      startDate: getDateAndTimeToString(
        new Date(prevStartDate ?? new Date().getTime()),
      ),
      floor: "",
      place: places[0].placeName,
      homeName: "",
      awayName: "",
      state5x5: true,
      homeScore: null,
      awayScore: null,
      fileName: null,
      filePath: null,
    };
    setAddCompetitionResultList((prevState) => {
      const resultList: addCompetitionResultType[] = [...prevState];
      resultList[divisionIndex].postResultRequestRows.push(initial);
      return resultList;
    });
    setGameNumber();
  };
  return (
    <div className={"mb-8 md:mb-12"}>
      <div
        className={
          "flex justify-center items-center bg-amber-400 mb-1.5 rounded-lg " +
          "text-sm sm:text-base md:text-xl " +
          "h-10 sm:h-12 md:h-14 "
        }
      >
        <p>{addCompetitionResultList[divisionIndex]?.division}</p>
      </div>
      {addCompetitionResultList[divisionIndex]?.postResultRequestRows.map(
        (result: addCompetitionResultRowType, i: number) => {
          return (
            <AddResultRowBox
              key={"row" + i}
              divisionIndex={divisionIndex}
              rowIndex={i}
              places={places}
              addCompetitionResultList={addCompetitionResultList}
              setAddCompetitionResultList={setAddCompetitionResultList}
              setGameNumber={setGameNumber}
            />
          );
        },
      )}
      <button
        onClick={() => plusHandler()}
        className={"w-full h-5 rounded-lg bg-[#B5B5B5]"}
      >
        +
      </button>
    </div>
  );
};

export default AddResultDivisionBox;
