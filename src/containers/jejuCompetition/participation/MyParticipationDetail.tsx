"use client";
import React from "react";
import PageTitle from "@/components/layout/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { FetchGetCompetitionDetail } from "@/services/CompetitionApi";
import { FetchGetParticipation } from "@/services/participationApi";
import PostTitle from "@/components/common/PostTitle";
import CompetitionLabel from "@/components/competition/CompetitionLabel";
import { useSession } from "next-auth/react";
import GetFileBox from "@/components/common/GetFileBox";

const MyParticipationDetail = ({ id }: { id: string }) => {
  const { data: session, status: sessionStatus } = useSession();
  const { data } = useQuery({
    queryKey: ["my-participation-detail", id],
    queryFn: async () => await FetchGetParticipation(id),
    select: (result) => result?.data.data,
  });

  console.log(session);
  return (
    <div className={"w-[90%] md:w-[800px] text-sm md:text-lg"}>
      <div className={"my-5"}>
        <PostTitle title={data?.competitionName} />
      </div>
      <div className={"px-2.5 bg-white rounded-lg"}>
        <div
          className={
            "flex flex-col gap-2.5 border-[#D9D9D9] border-solid border-b-[1px] py-2.5"
          }
        >
          <CompetitionLabel
            content={"종별"}
            color={"#4B4B4B"}
            bold={true}
            long={true}
          />
          <p className={"pl-1 md:pl-2"}>{data?.divisionName}</p>
        </div>
        <div
          className={
            "flex flex-col gap-2.5 border-[#D9D9D9] border-solid border-b-[1px] py-2.5"
          }
        >
          <CompetitionLabel
            content={"이름"}
            color={"#4B4B4B"}
            bold={true}
            long={true}
          />
          <p className={"pl-1 md:pl-2"}>{data?.name}</p>
        </div>
        <div
          className={
            "flex flex-col gap-2.5 border-[#D9D9D9] border-solid border-b-[1px] py-2.5"
          }
        >
          <CompetitionLabel
            content={"신청일"}
            color={"#4B4B4B"}
            bold={true}
            long={true}
          />
          <p className={"pl-1 md:pl-2"}>
            {data?.applicantDate?.replace("T", " ").substring(0, 16)}
          </p>
        </div>
        <div
          className={
            "flex flex-col gap-2.5 border-[#D9D9D9] border-solid border-b-[1px] py-2.5"
          }
        >
          <CompetitionLabel
            content={"휴대폰 번호"}
            color={"#4B4B4B"}
            bold={true}
            long={true}
          />
          <p className={"pl-1 md:pl-2"}>{data?.phoneNum}</p>
        </div>
        <div className={"flex flex-col gap-2.5 py-2.5"}>
          <CompetitionLabel
            content={"이메일"}
            color={"#4B4B4B"}
            bold={true}
            long={true}
          />
          <p className={"pl-1 md:pl-2"}>{data?.email}</p>
        </div>
      </div>
      <div className={"my-2.5"}>
        {data?.files.map(
          (
            file: { fileName: string; filePath: string; fileId: string },
            i: number,
          ) => {
            return (
              <GetFileBox
                fileName={file.fileName}
                fileUrl={file.filePath}
                key={`my-participation-detail-${i}`}
              />
            );
          },
        )}
      </div>
    </div>
  );
};

export default MyParticipationDetail;
