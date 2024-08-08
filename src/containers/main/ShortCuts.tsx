import ShortCutCard from "@/containers/main/ShortCutCard";

const ShortCuts = () => {
  return (
    <div
      className={
        "flex flex-col w-[280px] sm:w-[400px] md:w-[600px] mx-auto -mt-[75px] sm:-mt-[50px] md:-mt-[25px]"
      }
    >
      <div>
        <h3
          className={
            "text-[14px] sm:text-[20px] md:text-[28px] font-bold ml-[10px] mb-[10px]"
          }
        >
          바로가기
        </h3>
      </div>
      <div
        className={
          "flex flex-col justify-between h-[210px] sm:h-[270px] md:h-[330px]"
        }
      >
        <div className={"flex justify-between"}>
          <ShortCutCard
            title="공지사항"
            icon="/svg/mainPage/announcement.svg"
            alt="공지사항 이미지"
            content="안내, 개최, 합격자 발표 등의 정보를 만나볼 수 있습니다."
            backgroundImageUrl="/image/mainPage/announcement.jpg"
            navUrl="url"
          />
          <ShortCutCard
            title="대회정보"
            icon="/svg/mainPage/competition.svg"
            alt="대회정보 이미지"
            content="대회 현황, 종별, 기간 등의 정보를 만나볼 수 있습니다."
            backgroundImageUrl="/image/mainPage/competition.jpeg"
            navUrl="url"
          />
        </div>
        <div className={"flex justify-between"}>
          <ShortCutCard
            title="자료실"
            icon="/svg/mainPage/library.svg"
            alt="자료실 이미지"
            content="협회 또는 농구와 관련된 자료를 만나볼 수 있습니다."
            backgroundImageUrl="/image/mainPage/library.jpeg"
            navUrl="url"
          />
          <ShortCutCard
            title="FAQ"
            icon="/svg/mainPage/faq.svg"
            alt="FAQ 이미지"
            content="자주 묻곤하는 사항들에 대한 답변을 만나볼 수 있습니다."
            backgroundImageUrl="/image/mainPage/faq.jpeg"
            navUrl="url"
          />
        </div>
      </div>
    </div>
  );
};

export default ShortCuts;
