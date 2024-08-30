import React, { useEffect, useState } from "react";
import CompetitionLabel from "@/components/competition/CompetitionLabel";
import { ConfigProvider, DatePicker, Select, Space } from "antd";
import { koreanLocale } from "@/constants/AntdConfig";
import dayjs from "dayjs";
import {
  AddCompetitionScheduleRowType,
  AddCompetitionScheduleType,
  divisionType,
  placeType,
} from "@/types/CompetitionType";
import ScheduleRowInput from "@/components/competition/ScheduleRowInput";
import { IoClose } from "react-icons/io5";

type Props = {
  divisionIndex: number;
  rowIndex: number;
  places: placeType[];
  addCompetitionScheduleList: AddCompetitionScheduleType[];
  setAddCompetitionScheduleList: React.Dispatch<
    React.SetStateAction<AddCompetitionScheduleType[]>
  >;
  setGameNumber: any;
};
const AddRowBox = ({
  divisionIndex,
  rowIndex,
  places,
  addCompetitionScheduleList,
  setAddCompetitionScheduleList,
  setGameNumber,
}: Props) => {
  const [clientWidth, setClientWidth] = useState<number>(320);
  console.log(rowIndex);
  const placeOptions: divisionType[] = [];
  if (places) {
    places.forEach((p: placeType) =>
      placeOptions.push({ value: p.placeName, label: p.placeName }),
    );
  }
  const rowData =
    addCompetitionScheduleList[divisionIndex].postCompetitionScheduleRow[
      rowIndex
    ];

  const minusHandler = (): void => {
    setAddCompetitionScheduleList((prevState) => {
      const scheduleList: AddCompetitionScheduleType[] = [...prevState];
      scheduleList[divisionIndex].postCompetitionScheduleRow = scheduleList[
        divisionIndex
      ].postCompetitionScheduleRow.filter(
        (item: AddCompetitionScheduleRowType, index: number) =>
          rowIndex !== index,
      );
      return scheduleList;
    });
    setGameNumber();
  };

  const startDateHandler = (dateString: string) => {
    setAddCompetitionScheduleList((prevState) => {
      const scheduleList: AddCompetitionScheduleType[] = [...prevState];
      rowData.startDate = dateString;
      return scheduleList;
    });
    console.log(dateString);
    setGameNumber();
  };

  const floorHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddCompetitionScheduleList((prevState) => {
      const scheduleList: AddCompetitionScheduleType[] = [...prevState];
      rowData.floor = event.target.value;
      return scheduleList;
    });
  };

  const placeHandler = (value: string) => {
    setAddCompetitionScheduleList((prevState) => {
      const scheduleList: AddCompetitionScheduleType[] = [...prevState];
      rowData.place = value;
      return scheduleList;
    });
    setGameNumber();
  };

  const homeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddCompetitionScheduleList((prevState) => {
      const scheduleList: AddCompetitionScheduleType[] = [...prevState];
      rowData.homeName = e.target.value;
      return scheduleList;
    });
  };

  const awayNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddCompetitionScheduleList((prevState) => {
      const scheduleList: AddCompetitionScheduleType[] = [...prevState];
      rowData.awayName = e.target.value;
      return scheduleList;
    });
  };

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
        window.innerWidth < 640
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
            <div>
              <IoClose
                className={"cursor-pointer"}
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
            value={rowData.homeName}
            setValue={homeNameHandler}
            type={"text"}
            placeHolder={"HomeTeam"}
          />
          <p className={"mx-[10px] md:mx-[20px] text-white"}>vs</p>
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

export default AddRowBox;
