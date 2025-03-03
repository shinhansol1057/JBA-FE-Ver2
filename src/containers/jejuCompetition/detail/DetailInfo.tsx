import React, { useState } from "react";
import {
  CompetitionDetailType,
  CompetitionPlaceType,
  DivisionResponseType,
} from "@/types/competitionType";
import {
  calculatorCompetitionStatus,
  calculatorParticipationDuration,
} from "@/utils/calculatorCompetitionStatus";
import CompetitionLabel from "@/components/competition/CompetitionLabel";
import moment from "moment/moment";
import DOMPurify from "dompurify";
import GetFileBox from "@/components/common/GetFileBox";
import { IoMenu } from "react-icons/io5";
import UpdateDeleteModal from "@/components/common/UpdateDeleteModal";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { useRouter } from "next/navigation";
import { FetchDeleteCompetitionInfo } from "@/services/competitionApi";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useSession } from "next-auth/react";
import confirmAlert from "@/libs/alert/ConfirmAlert";

type Props = {
  data: CompetitionDetailType;
};
const DetailInfo = ({ data }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const status = calculatorCompetitionStatus(data.startDate, data.endDate);
  const startDate: string = moment(data.startDate).format("YYYY-MM-DD");
  const endDate: string = moment(data.endDate).format("YYYY-MM-DD");
  const cleanHtml = data.content ? DOMPurify.sanitize(data.content) : "";
  const router = useRouter();
  const isAdmin = useIsAdmin();
  const { data: session, status: sessionStatus } = useSession();
  console.log("session", session);

  const handleApplicationParticipation = async () => {
    if (session) {
      router.push(`/competition-participation/add/${data.competitionId}`);
    } else {
      await confirmAndCancelAlertWithLoading(
        "question",
        "로그인이 필요한 서비스입니다.",
        "로그인 페이지로 이동하시겠습니까?",
        () => {
          router.push("/login/social");
        },
      );
    }
  };
  return (
    <div>
      <div className={"px-2 bg-white rounded-lg shadow-xl "}>
        <div
          className={
            "flex justify-between items-center border-b border-solid border-[#D9D9D9] py-2.5 "
          }
        >
          <div className={"flex gap-2 items-center"}>
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
              long={false}
            />
            {calculatorParticipationDuration(
              data.participationStartDate,
              data.participationEndDate,
            ) && (
              <button
                className={
                  "bg-black px-4 py-1 text-white text-sm md:text-lg rounded-[20px] font-bold text-center"
                }
                onClick={handleApplicationParticipation}
              >
                참가신청 &gt;
              </button>
            )}
          </div>
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
            "flex items-center border-b border-solid border-[#D9D9D9] py-2.5 "
          }
        >
          <CompetitionLabel
            content={"종별"}
            color={""}
            long={true}
            bold={true}
          />
          <div
            className={
              "grid grid-cols-4 gap-2 text-sm sm:text-base md:text-lg md:grid-cols-6"
            }
          >
            {data.divisions.map((item: DivisionResponseType, i: number) => (
              <p key={i} className={"whitespace-nowrap"}>
                {item.divisionName}
              </p>
            ))}
          </div>
        </div>
        <div
          className={
            "flex items-center border-b border-solid border-[#D9D9D9] " +
            "text-sm sm:text-base md:text-lg py-2.5 "
          }
        >
          <CompetitionLabel
            content={"대회기간"}
            color={""}
            long={true}
            bold={true}
          />
          <p className={"text-sm sm:text-base md:text-lg"}>
            {startDate} ~ {endDate}
          </p>
        </div>
        <div
          className={
            "flex items-center border-b border-solid border-[#D9D9D9] py-2.5 "
          }
        >
          <CompetitionLabel
            content={"대회장소"}
            color={""}
            long={true}
            bold={true}
          />
          <div
            className={"flex flex-col text-sm sm:text-base md:text-lg gap-2"}
          >
            {data.places.map((place: CompetitionPlaceType, i: number) => {
              return (
                <div key={i} className={"flex flex-col md:flex-row"}>
                  <p>{place.placeName}</p>
                  <p className={"text-gray-400 md:ml-2"}>
                    {"(" + place.address + ")"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={
            "flex items-center border-b border-solid border-[#D9D9D9] py-2.5 "
          }
        >
          <CompetitionLabel
            content={"URL"}
            color={""}
            long={true}
            bold={true}
          />
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
            "pl-1 py-6 " +
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
              fileUrl={file.fileUrl}
              key={file.fileId}
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
