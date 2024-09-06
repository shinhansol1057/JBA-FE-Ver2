import React, { useEffect, useState } from "react";
import {
  addCompetitionResultRowType,
  addCompetitionResultType,
  divisionType,
  placeType,
} from "@/types/CompetitionType";
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
  places: placeType[];
  addCompetitionResultList: addCompetitionResultType[];
  setAddCompetitionResultList: React.Dispatch<
    React.SetStateAction<addCompetitionResultType[]>
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
  const placeOptions: divisionType[] = [];
  if (places) {
    places.forEach((p: placeType) =>
      placeOptions.push({ value: p.placeName, label: p.placeName }),
    );
  }
  const rowData =
    addCompetitionResultList[divisionIndex].postResultRequestRows[rowIndex];

  const minusHandler = (): void => {
    setAddCompetitionResultList((prevState) => {
      const resultList: addCompetitionResultType[] = [...prevState];
      resultList[divisionIndex].postResultRequestRows = resultList[
        divisionIndex
      ].postResultRequestRows.filter(
        (item: addCompetitionResultRowType, index: number) =>
          rowIndex !== index,
      );
      return resultList;
    });
    setGameNumber();
  };

  const startDateHandler = (dateString: string) => {
    setAddCompetitionResultList((prevState) => {
      const resultList: addCompetitionResultType[] = [...prevState];
      rowData.startDate = dateString;
      return resultList;
    });
    setGameNumber();
  };

  const floorHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddCompetitionResultList((prevState) => {
      const resultList: addCompetitionResultType[] = [...prevState];
      rowData.floor = event.target.value;
      return resultList;
    });
  };

  const placeHandler = (value: string) => {
    setAddCompetitionResultList((prevState) => {
      const resultList: addCompetitionResultType[] = [...prevState];
      rowData.place = value;
      return resultList;
    });
    setGameNumber();
  };

  const homeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddCompetitionResultList((prevState) => {
      const resultList: addCompetitionResultType[] = [...prevState];
      rowData.homeName = e.target.value;
      return resultList;
    });
  };

  const homeScoreHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddCompetitionResultList((prevState) => {
      const resultList: addCompetitionResultType[] = [...prevState];
      rowData.homeScore = Number(e.target.value);
      return resultList;
    });
  };

  const awayNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddCompetitionResultList((prevState) => {
      const resultList: addCompetitionResultType[] = [...prevState];
      rowData.awayName = e.target.value;
      return resultList;
    });
  };

  const awayScoreHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddCompetitionResultList((prevState) => {
      const resultList: addCompetitionResultType[] = [...prevState];
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
          const resultList: addCompetitionResultType[] = [...prevState];
          rowData.fileName = res.data.data[0]?.fileName;
          rowData.filePath = res.data.data[0]?.fileUrl;
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
                  cellWidth: 26,
                  inputFontSize: 10,
                  timeColumnWidth: 40,
                  fontSize: 10,
                },
                Select: {
                  optionFontSize: 10,
                  fontSize: 10,
                },
              },
            }
          : {
              components: {
                DatePicker: {
                  cellWidth: 34,
                  inputFontSize: 16,
                  timeColumnWidth: 50,
                  fontSize: 16,
                },
                Select: {
                  optionFontSize: 16,
                  fontSize: 16,
                },
              },
            }
      }
    >
      <div
        className={
          "w-full border border-solid border-borderColor shadow-xl rounded-[8px] " +
          "h-[90px] sm:h-[105px] md:h-[120px] text-[10px] sm:text-[12px] md:text-[16px] mb-[10px]"
        }
      >
        <div
          className={
            "flex flex-row items-center justify-between border-b border-solid border-[#D9D9D9] mx-[7px] " +
            "h-[30px] sm:h-[35px] md:h-[40px]"
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
            "flex flex-row items-center justify-between border-b border-solid border-[#D9D9D9] mx-[7px] " +
            "h-[30px] sm:h-[35px] md:h-[40px] "
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
                  "w-[60px] sm:w-[80px] md:w-[160px] " +
                  "mr-[5px] md:mr-[10px] "
                }
              >
                <label
                  htmlFor={"file" + divisionIndex + "&" + rowIndex}
                  className={
                    "w-[60px] sm:w-[80px] md:w-[160px] cursor-pointer flex flex-row items-center  "
                  }
                >
                  <p
                    className={
                      "w-[60px] sm:w-[80px] md:w-[160px] " +
                      "h-[20px] truncate cursor-pointer flex flex-row items-center " +
                      "text-[8px] sm:text-[10px] md:text-[14px] " +
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
                className={
                  "cursor-pointer text-[15px] sm:text-[20px] md:text-[30px]"
                }
                onClick={() => minusHandler()}
              />
            </div>
          </div>
        </div>
        <div
          className={
            "bg-black flex flex-row items-center justify-center rounded-b-[8px] " +
            "h-[30px] sm:h-[35px] md:h-[40px] px-[10px] md:px-[50px]"
          }
        >
          <ScheduleRowInput
            value={rowData.homeName ? rowData.homeName : undefined}
            setValue={homeNameHandler}
            type={"text"}
            placeHolder={"HomeTeam"}
          />
          <div className={"w-[40%] ml-[10px]"}>
            <ScheduleRowInput
              value={rowData.homeScore ? rowData.homeScore : undefined}
              setValue={homeScoreHandler}
              type={"number"}
              placeHolder={"점수"}
            />
          </div>
          <p className={"mx-[10px] md:mx-[20px] text-white"}>vs</p>
          <div className={"w-[40%] mr-[10px]"}>
            <ScheduleRowInput
              value={rowData.awayScore ? rowData.awayScore : undefined}
              setValue={awayScoreHandler}
              type={"number"}
              placeHolder={"점수"}
            />
          </div>
          <ScheduleRowInput
            value={rowData.awayName ? rowData.awayName : undefined}
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
