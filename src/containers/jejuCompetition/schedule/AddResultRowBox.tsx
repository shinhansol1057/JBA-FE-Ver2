import React, { useEffect, useState } from "react";
import {
  AddCompetitionResultRowType,
  AddCompetitionResultType,
  DivisionType,
  PlaceType,
} from "@/types/competitionType";
import ScheduleRowInput from "@/components/competition/ScheduleRowInput";
import { ConfigProvider, DatePicker, Select, Space } from "antd";
import { koreanLocale } from "@/constants/AntdConfig";
import dayjs from "dayjs";
import CompetitionLabel from "@/components/competition/CompetitionLabel";
import { IoClose } from "react-icons/io5";
import { FetchUploadFile } from "@/services/FileUploadApi";

type Props = {
  divisionIndex: number;
  rowIndex: number;
  places: PlaceType[];
  addCompetitionResultList: AddCompetitionResultType[];
  setAddCompetitionResultList: React.Dispatch<
    React.SetStateAction<AddCompetitionResultType[]>
  >;
  setGameNumber: any;
};
const AddResultRowBox = ({
  divisionIndex,
  rowIndex,
  places,
  addCompetitionResultList,
  setAddCompetitionResultList,
  setGameNumber,
}: Props) => {
  const [clientWidth, setClientWidth] = useState<number>(320);
  const placeOptions: DivisionType[] = [];
  if (places) {
    places.forEach((p: PlaceType) =>
      placeOptions.push({ value: p.placeName, label: p.placeName }),
    );
  }
  const rowData =
    addCompetitionResultList[divisionIndex].postResultRequestRows[rowIndex];

  const minusHandler = (): void => {
    setAddCompetitionResultList((prevState) => {
      const resultList: AddCompetitionResultType[] = [...prevState];
      resultList[divisionIndex].postResultRequestRows = resultList[
        divisionIndex
      ].postResultRequestRows.filter(
        (item: AddCompetitionResultRowType, index: number) =>
          rowIndex !== index,
      );
      return resultList;
    });
    setGameNumber();
  };

  const startDateHandler = (dateString: string) => {
    setAddCompetitionResultList((prevState) => {
      const resultList: AddCompetitionResultType[] = [...prevState];
      rowData.startDate = dateString;
      return resultList;
    });
    setGameNumber();
  };

  const floorHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddCompetitionResultList((prevState) => {
      const resultList: AddCompetitionResultType[] = [...prevState];
      rowData.floor = event.target.value;
      return resultList;
    });
  };

  const placeHandler = (value: string) => {
    setAddCompetitionResultList((prevState) => {
      const resultList: AddCompetitionResultType[] = [...prevState];
      rowData.place = value;
      return resultList;
    });
    setGameNumber();
  };

  const homeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddCompetitionResultList((prevState) => {
      const resultList: AddCompetitionResultType[] = [...prevState];
      rowData.homeName = e.target.value;
      return resultList;
    });
  };

  const homeScoreHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddCompetitionResultList((prevState) => {
      const resultList: AddCompetitionResultType[] = [...prevState];
      rowData.homeScore = Number(e.target.value);
      return resultList;
    });
  };

  const awayNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddCompetitionResultList((prevState) => {
      const resultList: AddCompetitionResultType[] = [...prevState];
      rowData.awayName = e.target.value;
      return resultList;
    });
  };

  const awayScoreHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddCompetitionResultList((prevState) => {
      const resultList: AddCompetitionResultType[] = [...prevState];
      rowData.awayScore = Number(e.target.value);
      return resultList;
    });
  };

  function fileHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
  ): void {
    if (e.target.files) {
      let files: File[] = [];
      files.push(e.target.files[0]);
      FetchUploadFile(files).then((res) => {
        setAddCompetitionResultList((prevState) => {
          const resultList: AddCompetitionResultType[] = [...prevState];
          rowData.fileName = res.data.data[0]?.fileName;
          rowData.fileUrl = res.data.data[0]?.fileUrl;
          return resultList;
        });
      });
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setClientWidth(window.innerWidth);
    };

    // 리스너를 추가하여 화면 크기 변경을 감지
    window.addEventListener("resize", handleResize);

    // 초기 렌더링 시 현재 화면의 너비 설정
    setClientWidth(window.innerWidth);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ConfigProvider
      theme={
        clientWidth < 640
          ? {
              components: {
                DatePicker: {
                  cellWidth: 30,
                  inputFontSize: 14,
                  timeColumnWidth: 40,
                  fontSize: 14,
                },
                Select: {
                  optionFontSize: 14,
                  fontSize: 14,
                },
              },
            }
          : {
              components: {
                DatePicker: {
                  cellWidth: 34,
                  inputFontSize: 18,
                  timeColumnWidth: 50,
                  fontSize: 18,
                },
                Select: {
                  optionFontSize: 18,
                  fontSize: 18,
                },
              },
            }
      }
    >
      <div
        className={
          "w-full border border-solid border-borderColor shadow-xl rounded-lg " +
          "text-sm sm:text-base md:text-lg mb-2.5"
        }
      >
        <div
          className={
            "flex flex-row items-center justify-between border-b border-solid border-[#D9D9D9] mx-2 " +
            "h-10 sm:h-12 md:h-14"
          }
        >
          <div className={"w-[35%]"}>
            <ScheduleRowInput
              value={rowData.floor}
              setValue={floorHandler}
              type={"text"}
              placeHolder={"floor"}
            />
          </div>
          <div className={"w-[60%] flex flex-row items-center"}>
            <Space style={{ width: "100%" }} direction="vertical">
              <DatePicker
                size={"small"}
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DDTHH:mm"
                placeholder={"시작일을 입력해주세요"}
                style={{ width: "100%" }}
                onChange={(date, dateString) =>
                  typeof dateString === "string" && startDateHandler(dateString)
                }
                locale={koreanLocale}
                value={dayjs(rowData.startDate)}
              />
            </Space>
          </div>
        </div>
        <div
          className={
            "flex flex-row items-center justify-between border-b border-solid border-[#D9D9D9] mx-2 " +
            "h-10 sm:h-12 md:h-14 "
          }
        >
          <div className={"w-[35%] flex flex-row items-center"}>
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                size={"small"}
                allowClear
                style={{ width: "100%" }}
                placeholder="장소를 선택해주세요"
                onChange={(value: string) => placeHandler(value)}
                options={placeOptions}
                value={rowData.place}
              />
            </Space>
          </div>
          <div className={"w-[60%] flex flex-row justify-between items-center"}>
            <div className={"flex"}>
              <CompetitionLabel
                content={"경기번호"}
                color={"text-[#4B4B4B] "}
                bold={true}
                long={true}
              />
              <p>{rowData.gameNumber}</p>
            </div>
            <div className={"flex items-center justify-between w-[50%] "}>
              <div
                className={
                  "flex justify-center bg-white items-center border border-solid border-[#B5B5B5] hover:bg-[#F5F5F5] " +
                  "w-14 sm:w-20 md:w-40 " +
                  "mr-1.5 md:mr-2.5 "
                }
              >
                <label
                  htmlFor={"file" + divisionIndex + "&" + rowIndex}
                  className={
                    "w-14 sm:w-20 md:w-40 cursor-pointer flex flex-row items-center  "
                  }
                >
                  <p
                    className={
                      "w-14 sm:w-20 md:w-40 " +
                      "h-5 truncate cursor-pointer flex flex-row items-center " +
                      "text-xs sm:text-sm md:text-base " +
                      (rowData.fileName === "" || rowData.fileName === null
                        ? "justify-center "
                        : "")
                    }
                  >
                    {rowData.fileName === "" || rowData.fileName === null
                      ? "파일 업로드"
                      : rowData.fileName}
                  </p>
                </label>
                <input
                  type="file"
                  id={"file" + divisionIndex + "&" + rowIndex}
                  multiple={false}
                  className={"hidden"}
                  onChange={(e) => fileHandler(e, rowIndex)}
                />
              </div>
              <IoClose
                className={"cursor-pointer text-base sm:text-xl md:text-3xl"}
                onClick={() => minusHandler()}
              />
            </div>
          </div>
        </div>
        <div
          className={
            "bg-black flex flex-row items-center justify-center rounded-b-lg " +
            "h-10 sm:h-12 md:h-14 px-2.5 md:px-12"
          }
        >
          <ScheduleRowInput
            value={rowData.homeName}
            setValue={homeNameHandler}
            type={"text"}
            placeHolder={"HomeTeam"}
          />
          <div className={"w-[40%] ml-2.5"}>
            <ScheduleRowInput
              value={rowData.homeScore}
              setValue={homeScoreHandler}
              type={"number"}
              placeHolder={"점수"}
            />
          </div>
          <p className={"mx-2.5 md:mx-5 text-white"}>vs</p>
          <div className={"w-[40%] mr-2.5"}>
            <ScheduleRowInput
              value={rowData.awayScore}
              setValue={awayScoreHandler}
              type={"number"}
              placeHolder={"점수"}
            />
          </div>
          <ScheduleRowInput
            value={rowData.awayName}
            setValue={awayNameHandler}
            type={"text"}
            placeHolder={"AwayHome"}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AddResultRowBox;
