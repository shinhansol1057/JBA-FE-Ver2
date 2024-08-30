import React, { useState } from "react";
import {
  competitionDetailType,
  competitionPlaceType,
} from "@/types/CompetitionType";
import { competitionStatusCalculator } from "@/utils/CompetitionStatusCalculator";
import CompetitionLabel from "@/components/competition/CompetitionLabel";
import moment from "moment/moment";
import DOMPurify from "dompurify";
import GetFileBox from "@/components/common/GetFileBox";
import { FindAdminRole } from "@/utils/JwtDecoder";
import { IoMenu } from "react-icons/io5";
import UpdateDeleteModal from "@/components/common/UpdateDeleteModal";
import ReactModal from "react-modal";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { useRouter } from "next/navigation";
import { FetchDeleteCompetitionInfo } from "@/services/CompetitionApi";

type Props = {
  data: competitionDetailType;
};
const DetailInfo = ({ data }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const status = competitionStatusCalculator(data.startDate, data.endDate);
  const startDate: string = moment(data.startDate).format("YYYY-MM-DD");
  const endDate: string = moment(data.endDate).format("YYYY-MM-DD");
  const cleanHtml = DOMPurify.sanitize(data.content);
  const router = useRouter();

  return (
    <div className={"w-[280px] sm:w-[400px] md:w-[800px]"}>
      <div
        className={
          "w-[280px] sm:w-[400px] md:w-[800px] px-[7px] bg-white rounded-[8px] shadow-xl "
        }
      >
        <div
          className={
            "flex justify-between items-center border-b border-solid border-[#D9D9D9] " +
            "min-h-[30px] sm:min-h-[40px] md:min-h-[50px] "
          }
        >
          <CompetitionLabel
            content={status}
            color={
              status === "예정"
                ? "text-red-500 "
                : status === "진행중"
                  ? "text-blue-700 "
                  : "text-black "
            }
            bold={true}
          />
          {FindAdminRole() ? (
            <IoMenu
              className={
                "text-[20px] sm:text-[25px] md:text-[35px] cursor-pointer"
              }
              onClick={() => setModalOpen(true)}
            />
          ) : (
            ""
          )}
        </div>
        <div
          className={
            "flex items-center border-b border-solid border-[#D9D9D9] " +
            "min-h-[30px] sm:min-h-[40px] md:min-h-[50px] "
          }
        >
          <CompetitionLabel content={"종별"} color={""} bold={true} />
          <div
            className={
              "grid grid-cols-6 gap-2 text-[10px] sm:text-[12px] md:text-[16px]"
            }
          >
            {data.divisions.map((item: string, i: number) => (
              <p key={i}>{item}</p>
            ))}
          </div>
        </div>
        <div
          className={
            "flex items-center border-b border-solid border-[#D9D9D9] " +
            "text-[10px] sm:text-[12px] md:text-[16px] " +
            "min-h-[30px] sm:min-h-[40px] md:min-h-[50px] "
          }
        >
          <CompetitionLabel
            content={"대회기간"}
            color={""}
            bold={true}
            long={true}
          />
          <p className={"text-[10px] sm:text-[12px] md:text-[16px]"}>
            {startDate} ~ {endDate}
          </p>
        </div>
        <div
          className={
            "flex items-center border-b border-solid border-[#D9D9D9] " +
            "min-h-[30px] sm:min-h-[40px] md:min-h-[50px]"
          }
        >
          <CompetitionLabel
            content={"대회장소"}
            color={""}
            bold={true}
            long={true}
          />
          <div
            className={
              "flex flex-col text-[10px] sm:text-[12px] md:text-[16px] pt-[5px]"
            }
          >
            {data.places.map((place: competitionPlaceType, i: number) => {
              return (
                <p
                  key={i}
                  className={
                    "pb-[5px] w-[215px] sm:w-[325px] md:w-[710px] leading-3 sm:leading-4 md:leading-5"
                  }
                >
                  {place.placeName}
                  <br />
                  {"(" + place.address + ")"}
                </p>
              );
            })}
          </div>
        </div>
        <div
          className={
            "flex items-center border-b border-solid border-[#D9D9D9] " +
            "min-h-[30px] sm:min-h-[40px] md:min-h-[50px] "
          }
        >
          <CompetitionLabel content={"URL"} color={""} bold={true} />
          {data.relatedUrl ? (
            <a
              className={
                "text-[10px] sm:text-[12px] md:text-[16px] underline text-[#2D42FF]"
              }
              href={data.relatedUrl}
            >
              {data.relatedUrl}
            </a>
          ) : (
            ""
          )}
        </div>
        <div
          className={
            "text-[10px] sm:text-[12px] md:text-[16px]" +
            " pl-[3px] py-[10px] " +
            "min-h-[100px] sm:min-h-[150px] md:min-h-[200px]"
          }
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
      </div>
      <div className={"mt-[20px] w-[280px] sm:w-[400px] md:w-[800px]"}>
        {data.competitionDetailAttachedFiles.map((file) => {
          return (
            <GetFileBox
              fileName={file.fileName}
              fileUrl={file.filePath}
              key={file.competitionAttachedFileId}
            />
          );
        })}
      </div>
      <UpdateDeleteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        deleteHandler={() => {
          confirmAndCancelAlertWithLoading(
            "warning",
            "대회를 삭제하겠습니까?",
            "삭제된 대회는 복구할 수 없습니다.",
            async () => {
              data.competitionId &&
                (await FetchDeleteCompetitionInfo(
                  data.competitionId.toString(),
                ));
            },
          );
        }}
        updateHandler={() => {
          router.push(`/jeju-competition/info/update/${data.competitionId}`);
        }}
      />
    </div>
  );
};

export default DetailInfo;
