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
import { IoMenu } from "react-icons/io5";
import UpdateDeleteModal from "@/components/common/UpdateDeleteModal";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { useRouter } from "next/navigation";
import { FetchDeleteCompetitionInfo } from "@/services/CompetitionApi";
import { useSession } from "next-auth/react";
import { useIsAdmin } from "@/hooks/useIsAdmin";

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
  const isAdmin = useIsAdmin();
  const { data: session, status: sessionStatus } = useSession();

  return (
    <div>
      <div className={"px-2 bg-white rounded-lg shadow-xl "}>
        <div
          className={
            "flex justify-between items-center border-b border-solid border-[#D9D9D9] " +
            "h-10 sm:h-12 md:h-14 "
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
          {isAdmin ? (
            <IoMenu
              className={"text-2xl sm:text-3xl md:text-4xl cursor-pointer"}
              onClick={() => setModalOpen(true)}
            />
          ) : (
            ""
          )}
        </div>
        <div
          className={
            "flex items-center border-b border-solid border-[#D9D9D9] " +
            "min-h-10 sm:min-h-12 md:min-h-14 "
          }
        >
          <CompetitionLabel content={"종별"} color={""} bold={true} />
          <div
            className={"grid grid-cols-6 gap-2 text-sm sm:text-base md:text-lg"}
          >
            {data.divisions.map((item: string, i: number) => (
              <p key={i}>{item}</p>
            ))}
          </div>
        </div>
        <div
          className={
            "flex items-center border-b border-solid border-[#D9D9D9] " +
            "text-sm sm:text-base md:text-lg " +
            "min-h-10 sm:min-h-12 md:min-h-14 "
          }
        >
          <CompetitionLabel
            content={"대회기간"}
            color={""}
            bold={true}
            long={true}
          />
          <p className={"text-sm sm:text-base md:text-lg"}>
            {startDate} ~ {endDate}
          </p>
        </div>
        <div
          className={
            "flex items-center border-b border-solid border-[#D9D9D9] " +
            "min-h-10 sm:min-h-12 md:min-h-14"
          }
        >
          <CompetitionLabel
            content={"대회장소"}
            color={""}
            bold={true}
            long={true}
          />
          <div className={"flex flex-col text-sm sm:text-base md:text-lg py-1"}>
            {data.places.map((place: competitionPlaceType, i: number) => {
              return (
                <p key={i}>
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
            "min-h-10 sm:min-h-12 md:min-h-14 "
          }
        >
          <CompetitionLabel content={"URL"} color={""} bold={true} />
          {data.relatedUrl ? (
            <a
              className={
                "text-sm sm:text-base md:text-lg underline text-[#2D42FF]"
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
            "text-sm sm:text-base md:text-lg " +
            "pl-1 py-2.5 " +
            "min-h-[150px] sm:min-h-[200px] md:min-h-[300px]"
          }
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
      </div>
      <div className={"my-5"}>
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
        deleteHandler={async () => {
          await confirmAndCancelAlertWithLoading(
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
